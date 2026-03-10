import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lease } from '../../../../model/lease/lease';
import {
  ArchiveIcon,
  CheckIcon,
  EllipsisIcon,
  FilePlusIcon,
  LucideAngularModule,
  PencilIcon,
  Trash2Icon,
  XCircleIcon,
} from 'lucide-angular';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LeaseStatusPipe } from '../../../../pipe/lease-status-pipe';
import { Menu } from '../../../layout/components/menu/menu';
import { MenuItem } from '../../../layout/components/menu/menu-item';
import { MenuTrigger } from '../../../layout/components/menu/menu-trigger';

@Component({
  selector: 'app-leases-panel',
  imports: [
    LucideAngularModule,
    DatePipe,
    NgClass,
    RouterLink,
    LeaseStatusPipe,
    Menu,
    MenuItem,
    MenuTrigger,
  ],
  templateUrl: './leases-panel.html',
})
export class LeasesPanel {
  @Input()
  leases: Lease[] = [];
  @Input()
  selectedLeaseId?: string;
  @Input()
  propertyId?: string;

  @Output()
  leaseSelect = new EventEmitter<Lease>();
  @Output()
  leaseConfirm = new EventEmitter<Lease>();
  @Output()
  leaseArchive = new EventEmitter<Lease>();
  @Output()
  leaseTerminate = new EventEmitter<Lease>();
  @Output()
  leaseDelete = new EventEmitter<Lease>();

  selectLease(lease: Lease): void {
    this.leaseSelect.emit(lease);
  }

  onConfirm(lease: Lease, menu: Menu): void {
    menu.close();
    this.leaseConfirm.emit(lease);
  }

  onArchive(lease: Lease, menu: Menu): void {
    menu.close();
    this.leaseArchive.emit(lease);
  }

  onTerminate(lease: Lease, menu: Menu): void {
    menu.close();
    this.leaseTerminate.emit(lease);
  }

  onDelete(lease: Lease, menu: Menu): void {
    menu.close();
    this.leaseDelete.emit(lease);
  }

  getLeaseLabel(lease: Lease): string {
    const tenant = lease.tenants?.[0];
    const fullName = [tenant?.firstName, tenant?.lastName]
      .filter(Boolean)
      .join(' ')
      .trim();
    return fullName || 'Bail';
  }

  canConfirmLease(lease: Lease): boolean {
    return lease.status === 'DRAFT';
  }

  canArchiveLease(lease: Lease): boolean {
    return lease.status === 'ACTIVE';
  }

  canTerminateLease(lease: Lease): boolean {
    return lease.status === 'ACTIVE';
  }

  canDeleteLease(lease: Lease): boolean {
    return lease.status === 'DRAFT';
  }

  canEditLease(lease: Lease): boolean {
    return lease.status !== 'ARCHIVED';
  }

  protected readonly FilePlusIcon = FilePlusIcon;
  protected readonly EllipsisIcon = EllipsisIcon;
  protected readonly CheckIcon = CheckIcon;
  protected readonly PencilIcon = PencilIcon;
  protected readonly ArchiveIcon = ArchiveIcon;
  protected readonly XCircleIcon = XCircleIcon;
  protected readonly Trash2Icon = Trash2Icon;
}
