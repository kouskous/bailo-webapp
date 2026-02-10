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
  subscriptionStatusClass: string | undefined;

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
      this.subscriptionStatusClass = undefined;
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
          this.subscriptionStatusClass = undefined;
        }
      });
  }

  private getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-700';
      case 'PAST_DUE':
        return 'bg-orange-100 text-orange-700';
      case 'CANCELED':
      case 'UNPAID':
        return 'bg-red-100 text-red-700';
      case 'TRIALING':
        return 'bg-blue-100 text-blue-700';
      case 'INCOMPLETE':
      case 'INCOMPLETE_EXPIRED':
        return 'bg-yellow-100 text-yellow-700';
      case 'PAUSED':
        return 'bg-gray-200 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
