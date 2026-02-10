export interface PaymentSchedule {
  id?: string;
  leaseId?: string;
  dueDate?: string;
  period?: string;
  amount?: number;
  currency?: 'EUR' | 'CHF';
  type?: 'RENT' | 'SECURITY_DEPOSIT' | 'RENT_PRORATA' | 'OTHER';
  status?: string;
  paidAmount?: number;
  createdAt?: string;
  updatedAt?: string;
}

