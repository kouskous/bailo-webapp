import {Address} from '../shared/address';

export interface Landlord {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: Address;
}
