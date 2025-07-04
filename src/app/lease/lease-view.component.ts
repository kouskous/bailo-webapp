import {Component, inject, OnInit} from '@angular/core';
import {
  ArrowLeftIcon, FileTextIcon,
  FlameIcon,
  HomeIcon,
  LayoutIcon,
  LucideAngularModule,
  MapPinIcon,
  RulerIcon
} from 'lucide-angular';
import {LeaseRepository} from '../../repository/lease-repository';
import {Lease} from '../../model/lease/lease';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DatePipe, TitleCasePipe} from '@angular/common';
import {LeaseViewSkeleton} from './lease-view-skeleton/lease-view-skeleton';
import {combineLatest, take, timer} from 'rxjs';

@Component({
  selector: 'app-lease',
  imports: [
    LucideAngularModule,
    RouterLink,
    TitleCasePipe,
    DatePipe,
    LeaseViewSkeleton
  ],
  templateUrl: './lease-view.component.html',
  styleUrl: './lease-view.component.scss'
})
export class LeaseView implements OnInit {
  leaseId: string | null = null;
  lease: Lease | undefined;
  loading = true;
  private readonly route = inject(ActivatedRoute);
  protected readonly RulerIcon = RulerIcon;

  constructor(private readonly leaseRepository: LeaseRepository) {
  }

  ngOnInit(): void {
    this.leaseId = this.route.snapshot.paramMap.get('id')
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
  protected readonly MapPinIcon = MapPinIcon;
  protected readonly HomeIcon = HomeIcon;
  protected readonly FlameIcon = FlameIcon;
  protected readonly ArrowLeftIcon = ArrowLeftIcon;
  protected readonly FileTextIcon = FileTextIcon;
}
