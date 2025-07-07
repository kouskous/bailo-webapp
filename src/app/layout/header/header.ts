import { Component } from '@angular/core';
import {AuthService, User} from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  user: User | null | undefined;
  constructor(private readonly auth: AuthService) {
    auth.user$.subscribe(user => this.user = user);
  }

}
