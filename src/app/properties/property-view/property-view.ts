import {Component, OnInit} from '@angular/core';
import {
  AlertCircleIcon,
  ArchiveIcon,
  ArrowLeftIcon,
  CheckIcon,
  EllipsisIcon,
  CreditCardIcon,
  PencilIcon,
  Trash2Icon,
  FilePlusIcon,
  FileTextIcon,
  HomeIcon,
  LucideAngularModule,
  MapPinIcon,
  PlusCircleIcon,
  PrinterIcon,
  UserMinusIcon,
  XCircleIcon
} from 'lucide-angular';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PaymentsSchedule} from './payments-schedule/payments-schedule';
import {LeaseSummary} from './lease-summary/lease-summary';
import {PropertyService} from '../../../service/property-service';
import {LeaseService} from '../../../service/lease.service';
import {Property} from '../../../model/property/property';
import {Lease} from '../../../model/lease/lease';
import {PaymentSchedule} from '../../../model/payment/payment-schedule';
import {combineLatest, finalize, take} from 'rxjs';
import {DatePipe, NgClass} from '@angular/common';
import {PaymentService} from '../../../service/payment.service';
import {Menu} from '../../layout/components/menu/menu';
import {MenuTrigger} from '../../layout/components/menu/menu-trigger';
import {MenuItem} from '../../layout/components/menu/menu-item';
import {LeaseStatusPipe} from '../../../pipe/lease-status-pipe';

@Component({
  selector: 'app-property-view',
  imports: [
    LucideAngularModule,
    RouterLink,
    PaymentsSchedule,
    LeaseSummary,
    Menu,
    MenuItem,
    MenuTrigger,
    LeaseStatusPipe,
    NgClass,
    DatePipe
  ],
  templateUrl: './property-view.html',
  styleUrl: './property-view.scss'
})
export class PropertyView implements OnInit {
  propertyId: string | null = null;
  property: Property | undefined;
  leases: Lease[] = [];
  selectedLease: Lease | undefined;
  paymentSchedules: PaymentSchedule[] = [];
  loading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly propertyRepository: PropertyService,
    private readonly leaseRepository: LeaseService,
    private readonly paymentRepository: PaymentService
  ) {
  }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    if (!this.propertyId) {
      this.loading = false;
      return;
    }

    combineLatest([
      this.propertyRepository.findById(this.propertyId),
      this.leaseRepository.findAll(this.propertyId)
    ]).pipe(take(1))
      .subscribe({
        next: ([property, leases]) => {
          this.property = property;
          this.leases = leases.filter((lease) => lease.status !== 'ARCHIVED');
          this.selectedLease = this.leases.find((lease) => lease.status === 'ACTIVE') ?? this.leases[0];
          this.loadSchedulesForSelectedLease();
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  selectLease(lease: Lease): void {
    this.selectedLease = lease;
    this.loadSchedulesForSelectedLease();
  }

  confirmLease(lease: Lease, menu: Menu): void {
    const leaseId = lease.id;
    if (!leaseId) {
      menu.close();
      return;
    }
    this.leaseRepository.confirm(leaseId)
      .pipe(
        take(1),
        finalize(() => menu.close())
      )
      .subscribe((updatedLease) => {
        this.replaceLeaseInList(updatedLease);
      });
  }

  archiveLease(lease: Lease, menu: Menu): void {
    const leaseId = lease.id;
    if (!leaseId) {
      menu.close();
      return;
    }
    this.leaseRepository.archive(leaseId)
      .pipe(
        take(1),
        finalize(() => menu.close())
      )
      .subscribe((updatedLease) => {
        this.replaceLeaseInList(updatedLease);
      });
  }

  terminateLease(lease: Lease, menu: Menu): void {
    const leaseId = lease.id;
    if (!leaseId) {
      menu.close();
      return;
    }

    const confirmed = window.confirm('Resilier ce bail ? Cette action est irreversible.');
    if (!confirmed) {
      menu.close();
      return;
    }

    this.leaseRepository.terminate(leaseId)
      .pipe(
        take(1),
        finalize(() => menu.close())
      )
      .subscribe((updatedLease) => {
        this.replaceLeaseInList(updatedLease);
      });
  }

  deleteLease(lease: Lease, menu: Menu): void {
    const leaseId = lease.id;
    if (!leaseId) {
      menu.close();
      return;
    }

    const confirmed = window.confirm('Supprimer ce bail ? Cette action est irreversible.');
    if (!confirmed) {
      menu.close();
      return;
    }

    this.leaseRepository.delete(leaseId)
      .pipe(
        take(1),
        finalize(() => menu.close())
      )
      .subscribe(() => {
        this.leases = this.leases.filter((item) => item.id !== leaseId);
        if (this.selectedLease?.id === leaseId) {
          this.selectedLease = this.leases.find((item) => item.status === 'ACTIVE') ?? this.leases[0];
          this.loadSchedulesForSelectedLease();
        }
      });
  }

  getLeaseLabel(lease: Lease): string {
    const tenant = lease.tenants?.[0];
    const fullName = [tenant?.firstName, tenant?.lastName].filter(Boolean).join(' ').trim();
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

  private loadSchedulesForSelectedLease(): void {
    const leaseId = this.selectedLease?.id;
    if (!leaseId) {
      this.paymentSchedules = [];
      return;
    }

    this.paymentRepository.findSchedulesByLease(leaseId)
      .pipe(take(1))
      .subscribe({
        next: (schedules) => {
          this.paymentSchedules = schedules;
        },
        error: () => {
          this.paymentSchedules = [];
        }
      });
  }

  private replaceLeaseInList(updatedLease: Lease): void {
    if (updatedLease.status === 'ARCHIVED') {
      this.leases = this.leases.filter((lease) => lease.id !== updatedLease.id);
      if (this.selectedLease?.id === updatedLease.id) {
        this.selectedLease = this.leases.find((lease) => lease.status === 'ACTIVE') ?? this.leases[0];
        this.loadSchedulesForSelectedLease();
      }
      return;
    }

    this.leases = this.leases.map((lease) => lease.id === updatedLease.id ? updatedLease : lease);
    if (this.selectedLease?.id === updatedLease.id) {
      this.selectedLease = updatedLease;
      this.loadSchedulesForSelectedLease();
    }
  }

  protected readonly MapPinIcon = MapPinIcon;
  protected readonly ArrowLeftIcon = ArrowLeftIcon;
  protected readonly PlusCircleIcon = PlusCircleIcon;
  protected readonly HomeIcon = HomeIcon;
  protected readonly ArchiveIcon = ArchiveIcon;
  protected readonly FilePlusIcon = FilePlusIcon;
  protected readonly UserMinusIcon = UserMinusIcon;
  protected readonly FileTextIcon = FileTextIcon;
  protected readonly CreditCardIcon = CreditCardIcon;
  protected readonly PrinterIcon = PrinterIcon;
  protected readonly XCircleIcon = XCircleIcon;
  protected readonly AlertCircleIcon = AlertCircleIcon;
  protected readonly CheckIcon = CheckIcon;
  protected readonly PencilIcon = PencilIcon;
  protected readonly EllipsisIcon = EllipsisIcon;
  protected readonly Trash2Icon = Trash2Icon;
}
