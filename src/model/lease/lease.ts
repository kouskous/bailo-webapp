import {LeaseStatus} from './lease-status';
import {PaymentFrequency} from './payment-frequency';
import {Currency} from '../shared/currency';
import {Property} from '../property/property';
import {Tenant} from '../tenant/tenant';


export interface Lease {
  id: string;
  propertyId: string;
  property?: Property;
  tenantIds: string[];
  tenants?: Tenant[];
  startDate: Date;
  endDate: Date;
  rentAmount: number;
  rentCurrency: Currency;
  paymentFrequency?: PaymentFrequency;
  securityDeposit?: number;
  status: LeaseStatus;
  createdAt: Date;
  updatedAt: Date;
}
