import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CheckCircle2Icon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-payment-success',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './payment-success.html',
})
export class PaymentSuccess {
  protected readonly CheckCircle2Icon = CheckCircle2Icon;
}
