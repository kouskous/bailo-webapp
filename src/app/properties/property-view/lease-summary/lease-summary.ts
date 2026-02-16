import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DownloadIcon, FileTextIcon, LucideAngularModule} from 'lucide-angular';
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
  @Input()
  canPreview = false;
  @Input()
  canDownload = false;

  @Output()
  preview = new EventEmitter<void>();
  @Output()
  download = new EventEmitter<void>();

  getTenantNames(): string {
    if (!this.lease?.tenants?.length) {
      return 'Locataires non renseignes';
    }
    return this.lease.tenants
      .map((tenant) => [tenant.firstName, tenant.lastName].filter(Boolean).join(' ').trim())
      .filter(Boolean)
      .join(', ');
  }

  onPreview(): void {
    this.preview.emit();
  }

  onDownload(): void {
    this.download.emit();
  }

  protected readonly FileTextIcon = FileTextIcon;
  protected readonly DownloadIcon = DownloadIcon;
}
