import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LucideAngularModule, PlusCircleIcon} from 'lucide-angular';
import {LeaseSkeletonCard} from './lease-skeleton-card/lease-skeleton-card';
import {PropertyRepository} from '../../repository/property-repository';
import {Property} from '../../model/property/property';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    LucideAngularModule,
    LeaseSkeletonCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {


  properties: Property[] = [];
  loading = true;

  constructor(private readonly propertyRepository: PropertyRepository,
              private readonly auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.loadProperties(user.sub?? '');
      }
    })
  }

  private loadProperties(accountId: string): void {
    this.propertyRepository.findAll(accountId).subscribe((properties) => {
      this.properties = properties;
      this.loading = false;
    });
  }

  protected readonly PlusCircleIcon = PlusCircleIcon;
}
