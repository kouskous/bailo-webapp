import {Address} from '../shared/address';

export interface Contractor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: Address;
  type: 'TENANT' | 'LANDLORD' ;
  createdAt: Date;
  updatedAt: Date;
}
