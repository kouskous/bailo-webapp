import {Routes} from '@angular/router';
import {Home} from './home/home';
import {AuthGuard} from '@auth0/auth0-angular';
import {LeaseView} from './lease/lease-view.component';
import {EditProperty} from './lease/edit-property/edit-property';
import {EditContractors} from './lease/edit-contractors/edit-contractors';
import {EditLeaseInformation} from './lease/edit-lease-information/edit-lease-information';

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
  },
  {
    path: 'lease/:id',
    component: LeaseView,
    canActivate: [AuthGuard],
  },
  {
    path: 'lease/:id/property',
    component: EditProperty,
    canActivate: [AuthGuard],
  },
  {
    path: 'lease/:id/contractors',
    component: EditContractors,
    canActivate: [AuthGuard],
  },
  {
    path: 'lease/:id/information',
    component: EditLeaseInformation,
    canActivate: [AuthGuard],
  }
];
