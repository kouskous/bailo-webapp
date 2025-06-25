import {Component, Input} from '@angular/core';
import {Lease} from '../../../model/lease/lease';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-lease-card',
  imports: [
    DatePipe
  ],
  templateUrl: './lease-card.html',
  styleUrl: './lease-card.scss'
})
export class LeaseCard {
  @Input()
  lease: Lease | undefined;
}
