import {Component, OnInit} from '@angular/core';
import {
  AlertCircleIcon,
  ArchiveIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  CreditCardIcon,
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
import {combineLatest, take} from 'rxjs';
import {NgClass, TitleCasePipe} from '@angular/common';
import {PaymentService} from '../../../service/payment.service';

@Component({
  selector: 'app-property-view',
  imports: [
    LucideAngularModule,
    RouterLink,
    PaymentsSchedule,
    LeaseSummary,
    NgClass,
    TitleCasePipe
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
          this.leases = leases;
          this.selectedLease = leases.find((lease) => lease.status === 'ACTIVE') ?? leases[0];
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

  getLeaseLabel(lease: Lease): string {
    const tenant = lease.tenants?.[0];
    const fullName = [tenant?.firstName, tenant?.lastName].filter(Boolean).join(' ').trim();
    return fullName || 'Bail';
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
  protected readonly CheckCircleIcon = CheckCircleIcon;
}
