import {LeaseStatus} from './lease-status';
import {PaymentFrequency} from './payment-frequency';
import {Currency} from '../shared/currency';
import {Property} from '../property/property';


export interface Lease {
  id: string;
  propertyId: string;
  property?: Property;
  startDate?: Date;
  endDate?: Date;
  furnished?: boolean;
  rentAmount?: number;
  rentCurrency?: Currency;
  paymentFrequency?: PaymentFrequency;
  securityDeposit?: number;
  status?: LeaseStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
