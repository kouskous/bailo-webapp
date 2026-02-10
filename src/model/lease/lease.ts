import {Contractor} from './contractor';
import {Address} from '../shared/address';

export interface Lease {
  id?: string;
  propertyId?: string;
  tenants?: Contractor[];
  landlords?: Contractor[];
  startDate?: string;
  endDate?: string;
  furnished?: boolean;
  rentAmount?: number;
  rentCurrency?: string;
  paymentFrequency?: string;
  securityDeposit?: number;
  status?: string;
  address?: Address;
  createdAt?: string;
  updatedAt?: string;
}
