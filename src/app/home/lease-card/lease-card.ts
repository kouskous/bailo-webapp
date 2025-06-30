import {Component, Input} from '@angular/core';
import {Lease} from '../../../model/lease/lease';
import {DatePipe} from '@angular/common';
import {Banknote, CalendarIcon, LucideAngularModule, MapPinIcon} from 'lucide-angular';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-lease-card',
  imports: [
    DatePipe,
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './lease-card.html',
  styleUrl: './lease-card.scss'
})
export class LeaseCard {
  @Input()
  lease: Lease | undefined;
  protected readonly MapPinIcon = MapPinIcon;
  protected readonly CalendarIcon = CalendarIcon;
  protected readonly Banknote = Banknote;
}
