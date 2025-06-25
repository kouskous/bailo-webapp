import {Address} from '../shared/address';

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: Address;
  createdAt: Date;
  updatedAt: Date;
}
