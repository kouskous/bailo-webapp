import {Component, OnInit} from '@angular/core';
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  FilePlusIcon,
  FileTextIcon,
  HomeIcon,
  LucideAngularModule,
  MapPinIcon,
  PencilIcon,
  PlusCircleIcon,
  UserMinusIcon
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
import {PaymentService} from '../../../service/payment.service';
import {LeasesPanel} from './leases-panel/leases-panel';
import {DocumentService} from '../../../service/document.service';
import {LeaseDocument} from '../../../model/document/lease-document';

@Component({
  selector: 'app-property-view',
  imports: [
    LucideAngularModule,
    RouterLink,
    PaymentsSchedule,
    LeaseSummary,
    LeasesPanel
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
    private readonly paymentRepository: PaymentService,
    private readonly documentService: DocumentService
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
      this.leaseRepository.findAll(this.propertyId, {page: 0, size: 100})
    ]).pipe(take(1))
      .subscribe({
        next: ([property, leasesPage]) => {
          this.property = property;
          const leases = leasesPage.content ?? [];
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

  confirmLease(lease: Lease): void {
    const leaseId = lease.id;
    if (!leaseId) {
      return;
    }
    this.leaseRepository.confirm(leaseId)
      .pipe(take(1))
      .subscribe((updatedLease) => {
        this.replaceLeaseInList(updatedLease);
      });
  }

  archiveLease(lease: Lease): void {
    const leaseId = lease.id;
    if (!leaseId) {
      return;
    }
    this.leaseRepository.archive(leaseId)
      .pipe(take(1))
      .subscribe((updatedLease) => {
        this.replaceLeaseInList(updatedLease);
      });
  }

  terminateLease(lease: Lease): void {
    const leaseId = lease.id;
    if (!leaseId) {
      return;
    }

    const confirmed = window.confirm('Résilier ce bail ? Cette action est irréversible.');
    if (!confirmed) {
      return;
    }

    this.leaseRepository.terminate(leaseId)
      .pipe(take(1))
      .subscribe((updatedLease) => {
        this.replaceLeaseInList(updatedLease);
      });
  }

  deleteLease(lease: Lease): void {
    const leaseId = lease.id;
    if (!leaseId) {
      return;
    }

    const confirmed = window.confirm('Supprimer ce bail ? Cette action est irréversible.');
    if (!confirmed) {
      return;
    }

    this.leaseRepository.delete(leaseId)
      .pipe(take(1))
      .subscribe(() => {
        this.leases = this.leases.filter((item) => item.id !== leaseId);
        if (this.selectedLease?.id === leaseId) {
          this.selectedLease = this.leases.find((item) => item.status === 'ACTIVE') ?? this.leases[0];
          this.loadSchedulesForSelectedLease();
        }
      });
  }

  canDownloadLease(lease: Lease): boolean {
    return lease.status === 'ACTIVE' && !!lease.id;
  }

  canPreviewLease(lease: Lease): boolean {
    return lease.status === 'DRAFT' && !!lease.id;
  }

  openLeasePreview(lease: Lease, event?: Event): void {
    event?.stopPropagation();
    if (!lease.id) {
      return;
    }
    const previewUrl = this.documentService.getLeasePreviewUrl(lease.id);
    window.open(previewUrl, '_blank');
  }

  downloadLease(lease: Lease, event?: Event): void {
    event?.stopPropagation();
    const leaseId = lease.id;
    if (!leaseId) {
      return;
    }

    this.documentService.findByLease(leaseId, 0, 100)
      .pipe(take(1))
      .subscribe((page) => {
        const contract = this.findReadyContract(page.content ?? []);
        if (!contract?.id) {
          window.open(this.documentService.getLeasePreviewUrl(leaseId), '_blank');
          return;
        }
        const downloadUrl = this.documentService.resolveUrl(
          contract.downloadUrl ?? this.documentService.getDownloadUrl(contract.id)
        );
        if (downloadUrl) {
          window.open(downloadUrl, '_blank');
        }
      });
  }

  onLeaseSummaryPreview(): void {
    if (this.selectedLease) {
      this.openLeasePreview(this.selectedLease);
    }
  }

  onLeaseSummaryDownload(): void {
    if (this.selectedLease) {
      this.downloadLease(this.selectedLease);
    }
  }

  private loadSchedulesForSelectedLease(): void {
    const leaseId = this.selectedLease?.id;
    if (!leaseId) {
      this.paymentSchedules = [];
      return;
    }

    this.paymentRepository.findSchedulesByLease(leaseId, 0, 100)
      .pipe(take(1))
      .subscribe({
        next: (schedulesPage) => {
          this.paymentSchedules = schedulesPage.content ?? [];
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

  private findReadyContract(documents: LeaseDocument[]): LeaseDocument | undefined {
    return documents.find((document) => document.type === 'LEASE_CONTRACT' && document.status === 'READY');
  }

  protected readonly MapPinIcon = MapPinIcon;
  protected readonly ArrowLeftIcon = ArrowLeftIcon;
  protected readonly PlusCircleIcon = PlusCircleIcon;
  protected readonly HomeIcon = HomeIcon;
  protected readonly FilePlusIcon = FilePlusIcon;
  protected readonly UserMinusIcon = UserMinusIcon;
  protected readonly FileTextIcon = FileTextIcon;
  protected readonly PencilIcon = PencilIcon;
  protected readonly CreditCardIcon = CreditCardIcon;
  protected readonly AlertCircleIcon = AlertCircleIcon;
}
