import {Component, Input} from '@angular/core';
import {Lease} from '../../../model/lease/lease';
import {DatePipe} from '@angular/common';
import {
  Banknote,
  CalendarIcon,
  DollarSignIcon,
  HandCoinsIcon,
  HouseIcon,
  LucideAngularModule,
  MapPinIcon,
  SwissFrancIcon
} from 'lucide-angular';

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
  protected readonly CalendarIcon = CalendarIcon;
  protected readonly SwissFrancIcon = SwissFrancIcon;
  protected readonly HandCoinsIcon = HandCoinsIcon;
  protected readonly DollarSignIcon = DollarSignIcon;
  protected readonly Banknote = Banknote;
}
