import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Payment} from '../../../../../model/payment/payment';
import {DatePipe, NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PaymentMethodPipe} from '../../../../../pipe/payment-method-pipe';
import {LucideAngularModule, PlusIcon, XIcon} from 'lucide-angular';

@Component({
  selector: 'app-payments-list',
  imports: [
    DatePipe,
    NgClass,
    FormsModule,
    PaymentMethodPipe,
    LucideAngularModule
  ],
  templateUrl: './payments-list.html'
})
export class PaymentsList {
  @Input()
  payments: Payment[] = [];
  @Input()
  leaseId?: string;
  @Input()
  loadingPayments = false;
  @Input()
  creatingPayment = false;

  @Output()
  paymentCreate = new EventEmitter<Payment>();

  isCreateModalOpen = false;

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

  submitCreate(): void {
    if (!this.leaseId || !this.newPayment.paymentDate || !this.newPayment.amount || this.newPayment.amount <= 0) {
      return;
    }

    this.paymentCreate.emit({
      paymentDate: this.newPayment.paymentDate,
      amount: Number(this.newPayment.amount),
      currency: this.newPayment.currency ?? 'CHF',
      method: this.newPayment.method ?? 'BANK_TRANSFER',
      note: this.newPayment.note ?? ''
    });

    this.newPayment = {
      paymentDate: this.todayIsoDate(),
      amount: undefined,
      currency: this.newPayment.currency ?? 'CHF',
      method: this.newPayment.method ?? 'BANK_TRANSFER',
      note: ''
    };
    this.isCreateModalOpen = false;
  }

  openCreateModal(): void {
    if (!this.leaseId || this.creatingPayment) {
      return;
    }
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    if (this.creatingPayment) {
      return;
    }
    this.isCreateModalOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isCreateModalOpen) {
      this.closeCreateModal();
    }
  }

  private todayIsoDate(): string {
    return new Date().toISOString().substring(0, 10);
  }

  protected readonly PlusIcon = PlusIcon;
  protected readonly XIcon = XIcon;
}
