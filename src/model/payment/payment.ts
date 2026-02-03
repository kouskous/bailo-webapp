export interface Payment {
  id: string;
  leaseId: string;
  paymentDate: Date;
  amount: number;
  currency: 'EUR' | 'CHF';
  method?: 'BANK_TRANSFER' | 'CASH' | 'CARD' | 'OTHER';
  note?: string;
  reconciled?: boolean;
  reconciledScheduleIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

