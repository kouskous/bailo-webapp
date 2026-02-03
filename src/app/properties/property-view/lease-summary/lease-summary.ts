import {Component, Input} from '@angular/core';
import {FileTextIcon, LucideAngularModule, LucideIconNode, UserMinusIcon} from 'lucide-angular';

@Component({
  selector: 'app-lease-summary',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './lease-summary.html',
  styleUrl: './lease-summary.scss'
})
export class LeaseSummary {

  protected readonly UserMinusIcon = UserMinusIcon;
  protected readonly FileTextIcon = FileTextIcon;
}
