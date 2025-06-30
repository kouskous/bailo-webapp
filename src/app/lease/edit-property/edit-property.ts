import { Component } from '@angular/core';
import {ArrowLeftIcon, LucideAngularModule} from 'lucide-angular';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-edit-property',
  imports: [
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './edit-property.html',
  styleUrl: './edit-property.scss'
})
export class EditProperty {

  protected readonly ArrowLeftIcon = ArrowLeftIcon;
}
