import {Component, OnInit} from '@angular/core';
import {Lease} from '../../model/lease/lease';
import {LeaseRepository} from '../../repository/lease-repository';
import {LeaseCard} from './lease-card/lease-card';
import {RouterLink} from '@angular/router';
import {LucideAngularModule, PlusCircleIcon} from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [
    LeaseCard,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {


  leases: Lease[] = [];

  constructor(private readonly leaseRepository: LeaseRepository) {
  }

  ngOnInit(): void {
    this.loadLeases();
  }

  private loadLeases() {
    this.leaseRepository.findAll().subscribe((leases: Lease[]) => {
      this.leases = leases;
      console.log('Leases loaded:', this.leases);
    })
  }

  protected readonly PlusCircleIcon = PlusCircleIcon;
}
