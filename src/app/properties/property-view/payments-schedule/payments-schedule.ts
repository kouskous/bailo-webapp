import {Component, Input} from '@angular/core';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  CreditCardIcon,
  LucideAngularModule,
  XCircleIcon
} from 'lucide-angular';
import {PaymentSchedule} from '../../../../model/payment/payment-schedule';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-payments-schedule',
  imports: [
    LucideAngularModule,
    DatePipe
  ],
  templateUrl: './payments-schedule.html',
  styleUrl: './payments-schedule.scss'
})
export class PaymentsSchedule {
  @Input()
  schedules: PaymentSchedule[] = [];

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
    if (status === 'PAID') return 'Paye';
    if (status === 'OVERDUE') return 'En retard';
    if (status === 'PARTIAL') return 'Partiel';
    if (status === 'PENDING') return 'A payer';
    return schedule.status ?? 'A traiter';
  }

  protected readonly AlertCircleIcon = AlertCircleIcon;
  protected readonly CreditCardIcon = CreditCardIcon;
  protected readonly XCircleIcon = XCircleIcon;
  protected readonly CheckCircleIcon = CheckCircleIcon;
}
