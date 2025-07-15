import { Component } from '@angular/core';
import {EditPropertySkeleton} from "../edit-property/edit-property-skeleton/edit-property-skeleton";
import {ArrowLeftIcon, LucideAngularModule} from "lucide-angular";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-edit-contractors',
  imports: [
    EditPropertySkeleton,
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './edit-contractors.html',
  styleUrl: './edit-contractors.scss'
})
export class EditContractors {
  loading = false;

  protected readonly ArrowLeftIcon = ArrowLeftIcon;
  leaseId: string | null = null;
}
