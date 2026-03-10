import { Contractor } from './contractor';
import { Address } from '../shared/address';

export interface AncillaryChargeItem {
  label?: string;
  amount?: number;
  currency?: string;
  billingPeriod?: string;
  effectiveCostJustificationRef?: string;
}

export interface Lease {
  id?: string;
  publicId?: string;
  propertyId?: string;
  tenants?: Contractor[];
  startDate?: string;
  endDate?: string;
  contractType?: string;
  usePurpose?: string;
  furnished?: boolean;
  rentAmount?: number;
  rentNetAmount?: number;
  totalMonthlyAmount?: number;
  rentCurrency?: string;
  paymentFrequency?: string;
  chargesAgreementType?: string;
  ancillaryCharges?: AncillaryChargeItem[];
  securityDeposit?: number;
  securityDepositAmount?: number;
  securityDepositCurrency?: string;
  securityDepositType?: string;
  securityDepositBankAccountRef?: string;
  securityDepositDepositedAt?: string;
  initialRentOfficialFormRequired?: boolean;
  initialRentOfficialFormRef?: string;
  initialRentOfficialFormServedAt?: string;
  previousTenantRentAmount?: number;
  previousTenantReferenceRate?: number;
  previousTenantCpiIndex?: number;
  initialRentIncreaseReason?: string;
  referenceRateAtSignature?: number;
  cpiAtSignature?: number;
  referenceDateAtSignature?: string;
  status?: string;
  address?: Address;
  createdAt?: string;
  updatedAt?: string;
}
