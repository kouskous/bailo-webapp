import {Component} from '@angular/core';
import {AuthService, User} from '@auth0/auth0-angular';
import {Menu} from '../components/menu/menu';
import {FlameIcon, LogOutIcon, LucideAngularModule, UserIcon} from 'lucide-angular';
import {MenuItem} from '../components/menu/menu-item';
import {MenuTrigger} from '../components/menu/menu-trigger';
import {take} from 'rxjs';
import {SubscriptionService} from '../../../service/subscription.service';
import {NgClass} from '@angular/common';
import {SubscriptionStatusPipe} from '../../../pipe/subscription-status-pipe';

@Component({
  selector: 'app-header',
  imports: [
    Menu,
    LucideAngularModule,
    MenuItem,
    MenuTrigger,
    NgClass,
    SubscriptionStatusPipe,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  user: User | null | undefined;
  subscriptionStatus: string | undefined;
  subscriptionStatusClass = '';

  constructor(private readonly auth: AuthService,
              private readonly subscriptionService: SubscriptionService) {
    auth.user$.subscribe(user => {
      this.user = user;
      this.loadSubscriptionStatus();
    });
  }

  protected readonly FlameIcon = FlameIcon;
  protected readonly UserIcon = UserIcon;
  protected readonly LogOutIcon = LogOutIcon;

  logout() {
    this.auth.logout();
  }

  goPremium(): void {
    const accountId = this.user?.sub;
    if (!accountId) {
      return;
    }
    const origin = window.location.origin;
    this.subscriptionService.createCheckoutSession(
      accountId,
      origin,
      origin
    ).pipe(take(1))
      .subscribe((response) => {
        window.location.href = response.url;
      });
  }

  isSubscriptionCta(): boolean {
    return this.subscriptionStatus === 'NONE';
  }

  onSubscriptionTagClick(event: MouseEvent): void {
    if (!this.isSubscriptionCta()) {
      return;
    }
    event.stopPropagation();
    this.goPremium();
  }

  openCustomerPortal(): void {
    const accountId = this.user?.sub;
    if (!accountId) {
      return;
    }
    const origin = window.location.origin;
    this.subscriptionService.createPortalSession(
      accountId,
      origin
    ).pipe(take(1))
      .subscribe((response) => {
        window.location.href = response.url;
      });
  }

  private loadSubscriptionStatus(): void {
    const accountId = this.user?.sub;
    if (!accountId) {
      this.subscriptionStatus = undefined;
      this.subscriptionStatusClass = '';
      return;
    }
    this.subscriptionService.getSubscription(accountId)
      .pipe(take(1))
      .subscribe({
        next: (subscription) => {
          const status = subscription.status;
          this.subscriptionStatus = status;
          this.subscriptionStatusClass = this.getStatusClass(status);
        },
        error: () => {
          this.subscriptionStatus = undefined;
          this.subscriptionStatusClass = '';
        }
      });
  }

  private getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'subscription-tag--active';
      case 'PAST_DUE':
        return 'subscription-tag--past-due';
      case 'CANCELED':
      case 'UNPAID':
        return 'subscription-tag--critical';
      case 'TRIALING':
        return 'subscription-tag--trialing';
      case 'INCOMPLETE':
      case 'INCOMPLETE_EXPIRED':
        return 'subscription-tag--warning';
      case 'PAUSED':
      case 'NONE':
        return 'subscription-tag--neutral';
      default:
        return 'subscription-tag--neutral';
    }
  }

  shouldShowGoPremium(): boolean {
    switch (this.subscriptionStatus) {
      case 'CANCELED':
      case 'INCOMPLETE_EXPIRED':
      case 'UNKNOWN':
      case 'UNPAID':
        return true;
      default:
        return false;
    }
  }

  shouldShowCustomerPortal(): boolean {
    switch (this.subscriptionStatus) {
      case 'ACTIVE':
      case 'TRIALING':
      case 'PAST_DUE':
      case 'INCOMPLETE':
      case 'PAUSED':
      case 'CANCELED':
      case 'UNPAID':
        return true;
      default:
        return false;
    }
  }
}
