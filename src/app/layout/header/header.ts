import {Component} from '@angular/core';
import {AuthService, User} from '@auth0/auth0-angular';
import {Menu} from '../components/menu/menu';
import {CircleAlertIcon, LoaderCircleIcon, LogOutIcon, LucideAngularModule, UserIcon, ZapIcon} from 'lucide-angular';
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
  isRedirecting = false;
  redirectTitle = '';
  redirectMessage = '';
  redirectError = '';

  constructor(private readonly auth: AuthService,
              private readonly subscriptionService: SubscriptionService) {
    auth.user$.subscribe(user => {
      this.user = user;
      this.loadSubscriptionStatus();
    });
  }

  protected readonly ZapIcon = ZapIcon;
  protected readonly UserIcon = UserIcon;
  protected readonly LogOutIcon = LogOutIcon;
  protected readonly LoaderCircleIcon = LoaderCircleIcon;
  protected readonly CircleAlertIcon = CircleAlertIcon;

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  goPremium(): void {
    if (this.isRedirecting) {
      return;
    }
    const accountId = this.user?.sub;
    if (!accountId) {
      return;
    }
    this.startRedirect(
      'Redirection vers le paiement securise',
      'Preparation de votre session Stripe en cours...'
    );
    const origin = window.location.origin;
    const successUrl = `${origin}/subscription/payment-success`;
    const cancelUrl = `${origin}/subscription/payment-failed`;
    this.subscriptionService.createCheckoutSession(
      accountId,
      successUrl,
      cancelUrl
    ).pipe(take(1))
      .subscribe({
        next: (response) => {
          window.location.href = response.url;
        },
        error: () => {
          this.isRedirecting = false;
          this.redirectError = 'Impossible de lancer le paiement pour le moment. Reessayez dans quelques instants.';
        }
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
    if (this.isRedirecting) {
      return;
    }
    const accountId = this.user?.sub;
    if (!accountId) {
      return;
    }
    this.startRedirect(
      'Redirection vers votre espace abonnement',
      'Ouverture du portail client securise...'
    );
    const origin = window.location.origin;
    this.subscriptionService.createPortalSession(
      accountId,
      origin
    ).pipe(take(1))
      .subscribe({
        next: (response) => {
          window.location.href = response.url;
        },
        error: () => {
          this.isRedirecting = false;
          this.redirectError = 'Impossible d ouvrir le portail client. Reessayez dans quelques instants.';
        }
      });
  }

  closeRedirectError(): void {
    this.redirectError = '';
  }

  private startRedirect(title: string, message: string): void {
    this.redirectTitle = title;
    this.redirectMessage = message;
    this.redirectError = '';
    this.isRedirecting = true;
  }

  private loadSubscriptionStatus(): void {
    const accountId = this.user?.sub;
    if (!accountId) {
      this.subscriptionStatus = undefined;
      return;
    }
    this.subscriptionService.getSubscription(accountId)
      .pipe(take(1))
      .subscribe({
        next: (subscription) => {
          this.subscriptionStatus = subscription.status;
        },
        error: () => {
          this.subscriptionStatus = undefined;
        }
      });
  }

  getSubscriptionTagClasses(): string {
    switch (this.subscriptionStatus) {
      case 'ACTIVE':
        return 'border-green-300 bg-gradient-to-br from-white to-green-50 text-green-800';
      case 'PAST_DUE':
      case 'INCOMPLETE':
      case 'INCOMPLETE_EXPIRED':
        return 'border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100 text-amber-800';
      case 'CANCELED':
      case 'UNPAID':
        return 'border-red-300 bg-gradient-to-br from-red-50 to-rose-50 text-red-800';
      case 'TRIALING':
        return 'border-blue-300 bg-gradient-to-br from-white to-blue-50 text-blue-800';
      case 'NONE':
        return 'cursor-pointer border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100 text-amber-800 hover:from-amber-100 hover:to-amber-200';
      case 'PAUSED':
      default:
        return 'border-gray-300 bg-gradient-to-br from-white to-slate-100 text-gray-700';
    }
  }

  getSubscriptionLabelClasses(): string {
    switch (this.subscriptionStatus) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'PAST_DUE':
      case 'INCOMPLETE':
      case 'INCOMPLETE_EXPIRED':
      case 'NONE':
        return 'bg-amber-100 text-amber-800';
      case 'CANCELED':
      case 'UNPAID':
        return 'bg-red-100 text-red-800';
      case 'TRIALING':
        return 'bg-blue-100 text-blue-800';
      case 'PAUSED':
      default:
        return 'bg-gray-100 text-gray-700';
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

  shouldShowSubscriptionTag(): boolean {
    switch (this.subscriptionStatus) {
      case 'NONE':
      case 'PAST_DUE':
      case 'INCOMPLETE':
      case 'INCOMPLETE_EXPIRED':
      case 'UNPAID':
      case 'CANCELED':
      case 'PAUSED':
      case 'UNKNOWN':
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

