import {Routes} from '@angular/router';
import {Home} from './home/home';
import {AuthGuard} from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
    canActivate: [AuthGuard]
  }
];
