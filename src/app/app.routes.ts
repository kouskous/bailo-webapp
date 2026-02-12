import {Routes} from '@angular/router';
import {AuthGuard} from '@auth0/auth0-angular';
import {LeaseView} from './lease/lease-view.component';
import {EditContractors} from './lease/edit-contractors/edit-contractors';
import {EditLeaseInformation} from './lease/edit-lease-information/edit-lease-information';
import { Properties } from './properties/properties.component';
import {PropertyView} from './properties/property-view/property-view';
import {EditProperty} from './properties/edit-property/edit-property';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'properties',
    pathMatch: 'full'
  },
  {
    path: 'properties',
    component: Properties,
    canActivate: [AuthGuard]
  },
  {
    path: 'properties/new',
    component: EditProperty,
    canActivate: [AuthGuard],
  },
  {
    path: 'properties/:id/edit',
    component: EditProperty,
    canActivate: [AuthGuard]
  },
  {
    path: 'properties/:id',
    component: PropertyView,
    canActivate: [AuthGuard]
  },
  {
    path: 'properties/:propertyId/lease/:leaseId',
    component: LeaseView,
    canActivate: [AuthGuard],
  },
  {
    path: 'properties/:propertyId/lease/:leaseId/property',
    component: EditProperty,
    canActivate: [AuthGuard],
  },
  {
    path: 'properties/:propertyId/lease/:leaseId/contractors',
    component: EditContractors,
    canActivate: [AuthGuard],
  },
  {
    path: 'properties/:propertyId/lease/new/information',
    component: EditLeaseInformation,
    canActivate: [AuthGuard],
  },
  {
    path: 'properties/:propertyId/lease/:leaseId/information',
    component: EditLeaseInformation,
    canActivate: [AuthGuard],
  }
];
