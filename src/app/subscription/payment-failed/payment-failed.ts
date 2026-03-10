import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CircleAlertIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-payment-failed',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './payment-failed.html',
})
export class PaymentFailed {
  protected readonly CircleAlertIcon = CircleAlertIcon;
}
