import { Component, OnInit } from '@angular/core';
import { ArrowLeftIcon, LucideAngularModule, UserIcon } from 'lucide-angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TextInput } from '../../layout/components/text-input/text-input';
import { EditPropertySkeleton } from '../../properties/edit-property/edit-property-skeleton/edit-property-skeleton';

@Component({
  selector: 'app-edit-contractors',
  imports: [EditPropertySkeleton, LucideAngularModule, RouterLink, TextInput],
  templateUrl: './edit-contractors.html',
  styleUrl: './edit-contractors.scss',
})
export class EditContractors {
  loading = false;

  protected readonly ArrowLeftIcon = ArrowLeftIcon;
  propertyId: string | null = null;
  leaseId: string | null = null;
  protected readonly UserIcon = UserIcon;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('propertyId');
    this.leaseId = this.route.snapshot.paramMap.get('leaseId');
  }
}
