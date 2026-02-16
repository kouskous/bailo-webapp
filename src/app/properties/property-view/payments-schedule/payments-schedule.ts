import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  AlertCircleIcon,
  Banknote,
  CalendarIcon,
  CreditCardIcon,
  FileTextIcon,
  LucideAngularModule
} from 'lucide-angular';
import {PaymentSchedule} from '../../../../model/payment/payment-schedule';
import {DecimalPipe, NgClass} from '@angular/common';
import {Payment} from '../../../../model/payment/payment';
import {PaymentService} from '../../../../service/payment.service';
import {take} from 'rxjs';
import {SchedulesList} from './schedules-list/schedules-list';
import {PaymentsList} from './payments-list/payments-list';
import {LeaseDocument} from '../../../../model/document/lease-document';
import {DocumentService} from '../../../../service/document.service';
import {DocumentsList} from './documents-list/documents-list';

@Component({
  selector: 'app-payments-schedule',
  imports: [
    LucideAngularModule,
    DecimalPipe,
    NgClass,
    SchedulesList,
    PaymentsList,
    DocumentsList
  ],
  templateUrl: './payments-schedule.html',
  styleUrl: './payments-schedule.scss'
})
export class PaymentsSchedule implements OnChanges {
  @Input()
  schedules: PaymentSchedule[] = [];
  @Input()
  leaseId?: string;

  activeTab: 'schedules' | 'payments' | 'documents' = 'schedules';
  payments: Payment[] = [];
  documents: LeaseDocument[] = [];
  loadingPayments = false;
  loadingDocuments = false;
  creatingPayment = false;

  constructor(
    private readonly paymentService: PaymentService,
    private readonly documentService: DocumentService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['leaseId']) {
      this.loadPayments();
      this.loadDocuments();
    }
  }

  get displayCurrency(): string {
    return this.schedules[0]?.currency ?? this.payments[0]?.currency ?? 'CHF';
  }

  get totalScheduledAmount(): number {
    return this.schedules.reduce((sum, schedule) => sum + this.asNumber(schedule.amount), 0);
  }

  get totalPaidAmount(): number {
    return this.payments.reduce((sum, payment) => sum + this.asNumber(payment.amount), 0);
  }

  get totalOutstandingAmount(): number {
    const outstanding = this.schedules.reduce((sum, schedule) => {
      const remaining = this.asNumber(schedule.amount) - this.asNumber(schedule.paidAmount);
      return sum + (remaining > 0 ? remaining : 0);
    }, 0);
    return Number(outstanding.toFixed(2));
  }

  get totalCreditAmount(): number {
    const credit = this.totalPaidAmount - this.totalScheduledAmount;
    return credit > 0 ? Number(credit.toFixed(2)) : 0;
  }

  setTab(tab: 'schedules' | 'payments' | 'documents'): void {
    this.activeTab = tab;
    if (tab === 'payments' && !this.payments.length) {
      this.loadPayments();
    }
    if (tab === 'documents' && !this.documents.length) {
      this.loadDocuments();
    }
  }

  createPayment(payment: Payment): void {
    if (!this.leaseId || !payment.paymentDate || !payment.amount || payment.amount <= 0) {
      return;
    }

    this.creatingPayment = true;
    this.paymentService.createPayment({
      leaseId: this.leaseId,
      paymentDate: new Date(`${payment.paymentDate}T00:00:00.000Z`).toISOString(),
      amount: Number(payment.amount),
      currency: payment.currency ?? 'CHF',
      method: payment.method ?? 'BANK_TRANSFER',
      note: payment.note ?? ''
    }).pipe(take(1)).subscribe({
      next: () => {
        this.loadPayments();
        this.loadSchedules();
        this.loadDocuments();
      },
      error: () => {
        this.creatingPayment = false;
      },
      complete: () => {
        this.creatingPayment = false;
      }
    });
  }

  private loadPayments(): void {
    if (!this.leaseId) {
      this.payments = [];
      return;
    }

    this.loadingPayments = true;
    this.paymentService.findPaymentsByLease(this.leaseId, 0, 100).pipe(take(1)).subscribe({
      next: (page) => {
        this.payments = page.content ?? [];
      },
      error: () => {
        this.payments = [];
        this.loadingPayments = false;
      },
      complete: () => {
        this.loadingPayments = false;
      }
    });
  }

  private loadSchedules(): void {
    if (!this.leaseId) {
      this.schedules = [];
      return;
    }

    this.paymentService.findSchedulesByLease(this.leaseId, 0, 100).pipe(take(1)).subscribe({
      next: (page) => {
        this.schedules = page.content ?? [];
      },
      error: () => {
        this.schedules = [];
      }
    });
  }

  private loadDocuments(): void {
    if (!this.leaseId) {
      this.documents = [];
      return;
    }

    this.loadingDocuments = true;
    this.documentService.findByLease(this.leaseId, 0, 100).pipe(take(1)).subscribe({
      next: (page) => {
        this.documents = page.content ?? [];
      },
      error: () => {
        this.documents = [];
        this.loadingDocuments = false;
      },
      complete: () => {
        this.loadingDocuments = false;
      }
    });
  }

  private asNumber(value: number | undefined): number {
    if (value === undefined || value === null || Number.isNaN(value)) {
      return 0;
    }
    return Number(value);
  }

  protected readonly AlertCircleIcon = AlertCircleIcon;
  protected readonly CalendarIcon = CalendarIcon;
  protected readonly CreditCardIcon = CreditCardIcon;
  protected readonly FileTextIcon = FileTextIcon;
  protected readonly Banknote = Banknote;
}
