export interface PaymentSchedule {
  id: string;
  leaseId: string;
  dueDate: Date;
  period: string;
  amount: number;
  currency: 'EUR' | 'CHF';
  type: 'RENT' | 'SECURITY_DEPOSIT' | 'OTHER';
  status?: 'PENDING' | 'PAID' | 'PARTIAL';
  paidAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

