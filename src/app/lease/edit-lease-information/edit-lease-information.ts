import { Component } from '@angular/core';
import {ArrowLeftIcon, LucideAngularModule} from "lucide-angular";
import {RouterLink} from '@angular/router';
import {EditPropertySkeleton} from '../../properties/edit-property/edit-property-skeleton/edit-property-skeleton';

@Component({
  selector: 'app-edit-lease-information',
  imports: [
    EditPropertySkeleton,
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './edit-lease-information.html',
  styleUrl: './edit-lease-information.scss'
})
export class EditLeaseInformation {

  loading = false;

  leaseId: string | null = null;
  protected readonly ArrowLeftIcon = ArrowLeftIcon;
}
