import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from './layout/header/header';
import {AuthService} from '@auth0/auth0-angular';
import {AuthLoading} from './layout/auth-loading/auth-loading';
import {combineLatest, filter, take, timer} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, AuthLoading],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isLoading = true;

  constructor(public auth: AuthService) {
    combineLatest([
      this.auth.isLoading$.pipe(filter(isLoading => !isLoading), take(1)),
      timer(2000).pipe(take(1))
    ]).subscribe(() => {
      this.isLoading = false;
    });
  }
}
