import {Component} from '@angular/core';
import {AuthService, User} from '@auth0/auth0-angular';
import {Menu} from '../components/menu/menu';
import {FlameIcon, LogOutIcon, LucideAngularModule, UserIcon} from 'lucide-angular';
import {MenuItem} from '../components/menu/menu-item';
import {MenuTrigger} from '../components/menu/menu-trigger';
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

  constructor(private readonly auth: AuthService) {
    auth.user$.subscribe(user => this.user = user);
  }

  protected readonly FlameIcon = FlameIcon;
  protected readonly UserIcon = UserIcon;
  protected readonly LogOutIcon = LogOutIcon;

  logout() {
    this.auth.logout();
  }
}
