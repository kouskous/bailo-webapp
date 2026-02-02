import {Component, Input} from '@angular/core';
import {Banknote, CalendarIcon, LucideAngularModule, MapPinIcon} from 'lucide-angular';
import {RouterLink} from '@angular/router';
import {Property} from '../../../model/property/property';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-property-card',
  imports: [
    LucideAngularModule,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './property-card.html',
  styleUrl: './property-card.scss'
})
export class PropertyCard {
  @Input()
  property: Property | undefined;
  protected readonly MapPinIcon = MapPinIcon;
  protected readonly CalendarIcon = CalendarIcon;
  protected readonly Banknote = Banknote;
}
