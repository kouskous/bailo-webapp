import {Component, Input} from '@angular/core';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  CreditCardIcon,
  LucideAngularModule,
  LucideIconNode,
  XCircleIcon
} from 'lucide-angular';

@Component({
  selector: 'app-payments-schedule',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './payments-schedule.html',
  styleUrl: './payments-schedule.scss'
})
export class PaymentsSchedule {
  protected readonly AlertCircleIcon = AlertCircleIcon;
  protected readonly CreditCardIcon = CreditCardIcon;
  protected readonly XCircleIcon = XCircleIcon;
  protected readonly CheckCircleIcon = CheckCircleIcon;
}
