import {Component, OnInit} from '@angular/core';
import {Lease} from '../../model/lease/lease';
import {LeaseRepository} from '../../repository/lease-repository';
import {LeaseCard} from './lease-card/lease-card';
import {RouterLink} from '@angular/router';
import {LucideAngularModule, PlusCircleIcon} from 'lucide-angular';
import {LeaseSkeletonCard} from './lease-skeleton-card/lease-skeleton-card';
import {combineLatest, take, timer} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    LeaseCard,
    RouterLink,
    LucideAngularModule,
    LeaseSkeletonCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {


  leases: Lease[] = [];
  loading = true;

  constructor(private readonly leaseRepository: LeaseRepository) {
  }

  ngOnInit(): void {
    this.loadLeases();
  }

  private loadLeases() {
    combineLatest([
      this.leaseRepository.findAll(),
      timer(2000)
    ]).pipe(take(1)).subscribe(([leases]) => {
      this.leases = leases;
      this.loading = false;
    });
  }

  protected readonly PlusCircleIcon = PlusCircleIcon;
}
