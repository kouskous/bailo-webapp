import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LucideAngularModule, PlusCircleIcon} from 'lucide-angular';
import {PropertySkeletonCard} from './property-skeleton-card/property-skeleton-card';
import {PropertyRepository} from '../../repository/property-repository';
import {Property} from '../../model/property/property';
import {AuthService} from '@auth0/auth0-angular';
import {PropertyCard} from './property-card/property-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule,
    PropertySkeletonCard,
    PropertyCard
  ],
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class Properties implements OnInit {


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
