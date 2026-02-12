import {Component, Input} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {Lease} from '../../../../model/lease/lease';
import {DatePipe, NgClass} from '@angular/common';
import {LeaseStatusPipe} from '../../../../pipe/lease-status-pipe';
import {PaymentFrequencyPipe} from '../../../../pipe/payment-frequency-pipe';

@Component({
  selector: 'app-lease-summary',
  imports: [
    LucideAngularModule,
    DatePipe,
    NgClass,
    LeaseStatusPipe,
    PaymentFrequencyPipe
  ],
  templateUrl: './lease-summary.html',
  styleUrl: './lease-summary.scss'
})
export class LeaseSummary {
  @Input()
  lease: Lease | undefined;

  getTenantNames(): string {
    if (!this.lease?.tenants?.length) {
      return 'Locataires non renseignes';
    }
    return this.lease.tenants
      .map((tenant) => [tenant.firstName, tenant.lastName].filter(Boolean).join(' ').trim())
      .filter(Boolean)
      .join(', ');
  }

}
