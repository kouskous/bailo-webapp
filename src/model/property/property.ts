import {PropertyType} from './property-type';
import {Address} from '../shared/address';
import {Landlord} from './landlord';

export interface Property {
  id: string
  name: string;
  type: PropertyType;
  landlord: Landlord[];
  address: Address;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
