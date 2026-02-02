import { Component } from '@angular/core';
import {ArrowLeftIcon, LucideAngularModule, MapPinIcon, PlusCircleIcon} from 'lucide-angular';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-property-view',
  imports: [
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './property-view.html',
  styleUrl: './property-view.scss'
})
export class PropertyView {

  protected readonly MapPinIcon = MapPinIcon;
  protected readonly ArrowLeftIcon = ArrowLeftIcon;
  protected readonly PlusCircleIcon = PlusCircleIcon;
}
