import { Component } from '@angular/core';
import {
  AlertCircleIcon,
  ArchiveIcon,
  ArrowLeftIcon, CheckCircleIcon, CreditCardIcon,
  FilePlusIcon, FileTextIcon,
  HomeIcon,
  LucideAngularModule,
  MapPinIcon,
  PlusCircleIcon, PrinterIcon, UserMinusIcon, XCircleIcon
} from 'lucide-angular';
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
  protected readonly HomeIcon = HomeIcon;
  protected readonly ArchiveIcon = ArchiveIcon;
  protected readonly FilePlusIcon = FilePlusIcon;
  protected readonly UserMinusIcon = UserMinusIcon;
  protected readonly FileTextIcon = FileTextIcon;
  protected readonly CreditCardIcon = CreditCardIcon;
  protected readonly PrinterIcon = PrinterIcon;
  protected readonly XCircleIcon = XCircleIcon;
  protected readonly AlertCircleIcon = AlertCircleIcon;
  protected readonly CheckCircleIcon = CheckCircleIcon;
}
