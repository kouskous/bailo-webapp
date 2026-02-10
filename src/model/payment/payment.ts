export interface Payment {
  id?: string;
  leaseId?: string;
  paymentDate?: string;
  amount?: number;
  currency?: 'EUR' | 'CHF';
  method?: string;
  note?: string;
  reconciled?: boolean;
  reconciledScheduleIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

