import {Component, Input} from '@angular/core';
import {PaymentSchedule} from '../../../../../model/payment/payment-schedule';
import {DatePipe} from '@angular/common';
import {AlertCircleIcon, CheckCircleIcon, LucideAngularModule, XCircleIcon} from 'lucide-angular';

@Component({
  selector: 'app-schedules-list',
  imports: [
    LucideAngularModule,
    DatePipe
  ],
  templateUrl: './schedules-list.html'
})
export class SchedulesList {
  @Input()
  schedules: PaymentSchedule[] = [];

  isPaid(schedule: PaymentSchedule): boolean {
    return schedule.status?.toUpperCase() === 'PAID';
  }

  isOverdue(schedule: PaymentSchedule): boolean {
    return schedule.status?.toUpperCase() === 'OVERDUE';
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
  protected readonly XCircleIcon = XCircleIcon;
  protected readonly CheckCircleIcon = CheckCircleIcon;
}
