import {Component, inject, OnInit} from '@angular/core';
import {FlameIcon, HomeIcon, LayoutIcon, LucideAngularModule, MapPinIcon, RulerIcon} from 'lucide-angular';
import {LeaseRepository} from '../../repository/lease-repository';
import {Lease} from '../../model/lease/lease';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DatePipe, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-lease',
  imports: [
    LucideAngularModule,
    RouterLink,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './lease-view.component.html',
  styleUrl: './lease-view.component.scss'
})
export class LeaseView implements OnInit {
  leaseId: string | null = null;
  lease: Lease | undefined;
  private route = inject(ActivatedRoute);
  protected readonly RulerIcon = RulerIcon;

  constructor(private readonly leaseRepository: LeaseRepository) {
  }

  ngOnInit(): void {
    this.leaseId = this.route.snapshot.paramMap.get('id')
    if( this.leaseId){
      this.leaseRepository.findById(this.leaseId).subscribe((lease: Lease)=>{
        console.log(lease);
        this.lease = lease;
      })
    }
  }

  protected readonly LayoutIcon = LayoutIcon;
  protected readonly MapPinIcon = MapPinIcon;
  protected readonly HomeIcon = HomeIcon;
  protected readonly FlameIcon = FlameIcon;
}
