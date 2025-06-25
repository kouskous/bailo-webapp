import {Component, OnInit} from '@angular/core';
import {Lease} from '../../model/lease/lease';
import {LeaseRepository} from '../../repository/lease-repository';
import {DatePipe} from '@angular/common';
import {LeaseCard} from './lease-card/lease-card';

@Component({
  selector: 'app-home',
  imports: [
    DatePipe,
    LeaseCard
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
}
