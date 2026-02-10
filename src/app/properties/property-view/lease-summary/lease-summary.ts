import {Component, Input} from '@angular/core';
import {FileTextIcon, LucideAngularModule, UserMinusIcon} from 'lucide-angular';
import {Lease} from '../../../../model/lease/lease';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-lease-summary',
  imports: [
    LucideAngularModule,
    DatePipe
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

  protected readonly UserMinusIcon = UserMinusIcon;
  protected readonly FileTextIcon = FileTextIcon;
}
