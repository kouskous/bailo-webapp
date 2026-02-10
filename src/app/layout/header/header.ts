import {Component} from '@angular/core';
import {AuthService, User} from '@auth0/auth0-angular';
import {Menu} from '../components/menu/menu';
import {FlameIcon, LogOutIcon, LucideAngularModule, UserIcon} from 'lucide-angular';
import {MenuItem} from '../components/menu/menu-item';
import {MenuTrigger} from '../components/menu/menu-trigger';
import {take} from 'rxjs';
import {SubscriptionService} from '../../../service/subscription.service';

@Component({
  selector: 'app-header',
  imports: [
    Menu,
    LucideAngularModule,
    MenuItem,
    MenuTrigger,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  user: User | null | undefined;

  constructor(private readonly auth: AuthService,
              private readonly subscriptionService: SubscriptionService) {
    auth.user$.subscribe(user => this.user = user);
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
}
