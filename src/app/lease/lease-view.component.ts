import {Component, inject, OnInit} from '@angular/core';
import {
  ArrowLeftIcon,
  FileTextIcon,
  FlameIcon,
  HomeIcon,
  LayoutIcon,
  LucideAngularModule,
  RulerIcon
} from 'lucide-angular';
import {LeaseService} from '../../service/lease.service';
import {Lease} from '../../model/lease/lease';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {LeaseViewSkeleton} from './lease-view-skeleton/lease-view-skeleton';
import {combineLatest, take, timer} from 'rxjs';
import {PropertyFeature} from '../../model/property/property';
import {LeaseStatusPipe} from '../../pipe/lease-status-pipe';
import {PaymentFrequencyPipe} from '../../pipe/payment-frequency-pipe';

@Component({
  selector: 'app-lease',
  imports: [
    LucideAngularModule,
    RouterLink,
    DatePipe,
    LeaseStatusPipe,
    PaymentFrequencyPipe,
    LeaseViewSkeleton
  ],
  templateUrl: './lease-view.component.html',
  styleUrl: './lease-view.component.scss'
})
export class LeaseView implements OnInit {
  leaseId: string | null = null;
  propertyId: string | null = null;
  lease: Lease | undefined;
  loading = true;
  private readonly route = inject(ActivatedRoute);
  protected readonly RulerIcon = RulerIcon;

  constructor(private readonly leaseRepository: LeaseService) {
  }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('propertyId');
    this.leaseId = this.route.snapshot.paramMap.get('leaseId');
    if (this.leaseId) {
      combineLatest([
        this.leaseRepository.findById(this.leaseId),
        timer(500)
      ]).pipe(take(1))
        .subscribe(([lease]) => {
          this.lease = lease;
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  protected readonly LayoutIcon = LayoutIcon;
  protected readonly HomeIcon = HomeIcon;
  protected readonly FlameIcon = FlameIcon;
  protected readonly ArrowLeftIcon = ArrowLeftIcon;
  protected readonly FileTextIcon = FileTextIcon;

  getEnabledFeatures(features?: PropertyFeature): string[] {
    if (!features) return [];
    return Object.keys(features).filter((key) => (features as any)[key] === true);
  }
}
