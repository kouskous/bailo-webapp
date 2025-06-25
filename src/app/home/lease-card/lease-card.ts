import {Component, Input} from '@angular/core';
import {Lease} from '../../../model/lease/lease';
import {DatePipe} from '@angular/common';
import {HouseIcon, LucideAngularModule, MapPinIcon} from 'lucide-angular';

@Component({
  selector: 'app-lease-card',
  imports: [
    DatePipe,
    LucideAngularModule
  ],
  templateUrl: './lease-card.html',
  styleUrl: './lease-card.scss'
})
export class LeaseCard {
  @Input()
  lease: Lease | undefined;
  protected readonly HouseIcon = HouseIcon;
  protected readonly MapPinIcon = MapPinIcon;
}
