import {Contractor} from './contractor';

export interface Lease {
  id: string;
  propertyId: string;
  startDate: Date;
  endDate?: Date;
  tenants: Contractor[],
  landlords: Contractor[];
  furnished: boolean;
  rentAmount: number;
  rentCurrency: 'EUR' | 'CHF';
  paymentFrequency?: 'MONTHLY' | 'WEEKLY' | 'QUARTERLY' | 'YEARLY';
  securityDeposit?: number;
  status?: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  createdAt?: Date;
  updatedAt?: Date;
}
