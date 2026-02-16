import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  AlertCircleIcon,
  CalendarIcon,
  CheckCircleIcon,
  CreditCardIcon,
  PlusIcon,
  LucideAngularModule,
  XCircleIcon
} from 'lucide-angular';
import {PaymentSchedule} from '../../../../model/payment/payment-schedule';
import {DatePipe, NgClass} from '@angular/common';
import {Payment} from '../../../../model/payment/payment';
import {PaymentService} from '../../../../service/payment.service';
import {FormsModule} from '@angular/forms';
import {take} from 'rxjs';
import {PaymentMethodPipe} from '../../../../pipe/payment-method-pipe';

@Component({
  selector: 'app-payments-schedule',
  imports: [
    LucideAngularModule,
    DatePipe,
    NgClass,
    FormsModule,
    PaymentMethodPipe
  ],
  templateUrl: './payments-schedule.html',
  styleUrl: './payments-schedule.scss'
})
export class PaymentsSchedule implements OnChanges {
  @Input()
  schedules: PaymentSchedule[] = [];
  @Input()
  leaseId?: string;

  activeTab: 'schedules' | 'payments' = 'schedules';
  payments: Payment[] = [];
  loadingPayments = false;
  creatingPayment = false;

  newPayment: Payment = {
    paymentDate: this.todayIsoDate(),
    amount: undefined,
    currency: 'CHF',
    method: 'BANK_TRANSFER',
    note: ''
  };

  readonly paymentMethodOptions = [
    'BANK_TRANSFER',
    'DIRECT_DEBIT',
    'CREDIT_CARD',
    'CASH',
    'CHECK',
    'OTHER'
  ];

  constructor(private readonly paymentService: PaymentService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['leaseId']) {
      this.loadPayments();
    }
  }

  isPaid(schedule: PaymentSchedule): boolean {
    return schedule.status?.toUpperCase() === 'PAID';
  }

  isOverdue(schedule: PaymentSchedule): boolean {
    return schedule.status?.toUpperCase() === 'OVERDUE';
  }

  isPending(schedule: PaymentSchedule): boolean {
    return schedule.status?.toUpperCase() === 'PENDING';
  }

  isPartial(schedule: PaymentSchedule): boolean {
    return schedule.status?.toUpperCase() === 'PARTIAL';
  }

  getStatusLabel(schedule: PaymentSchedule): string {
    const status = schedule.status?.toUpperCase();
    if (status === 'PAID') return 'Payé';
    if (status === 'OVERDUE') return 'En retard';
    if (status === 'PARTIAL') return 'Partiel';
    if (status === 'PENDING') return 'A payer';
    return schedule.status ?? 'A traiter';
  }

  setTab(tab: 'schedules' | 'payments'): void {
    this.activeTab = tab;
    if (tab === 'payments' && !this.payments.length) {
      this.loadPayments();
    }
  }

  createPayment(): void {
    if (!this.leaseId || !this.newPayment.paymentDate || !this.newPayment.amount || this.newPayment.amount <= 0) {
      return;
    }

    this.creatingPayment = true;
    this.paymentService.createPayment({
      leaseId: this.leaseId,
      paymentDate: new Date(`${this.newPayment.paymentDate}T00:00:00.000Z`).toISOString(),
      amount: Number(this.newPayment.amount),
      currency: this.newPayment.currency ?? 'CHF',
      method: this.newPayment.method ?? 'BANK_TRANSFER',
      note: this.newPayment.note ?? ''
    }).pipe(take(1)).subscribe({
      next: () => {
        this.newPayment = {
          paymentDate: this.todayIsoDate(),
          amount: undefined,
          currency: this.newPayment.currency ?? 'CHF',
          method: this.newPayment.method ?? 'BANK_TRANSFER',
          note: ''
        };
        this.loadPayments();
        this.loadSchedules();
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

  private todayIsoDate(): string {
    return new Date().toISOString().substring(0, 10);
  }

  protected readonly AlertCircleIcon = AlertCircleIcon;
  protected readonly XCircleIcon = XCircleIcon;
  protected readonly CheckCircleIcon = CheckCircleIcon;
  protected readonly PlusIcon = PlusIcon;
  protected readonly CalendarIcon = CalendarIcon;
  protected readonly CreditCardIcon = CreditCardIcon;
}
