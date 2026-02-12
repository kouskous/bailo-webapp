import {Contractor} from './contractor';

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
  createdAt?: string;
  updatedAt?: string;
}
