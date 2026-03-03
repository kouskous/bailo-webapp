export interface LeaseDocument {
  id?: string;
  leaseId?: string;
  paymentScheduleId?: string;
  type?: string;
  status?: string;
  label?: string;
  period?: string;
  dueDate?: string;
  issuedAt?: string;
  fileName?: string;
  viewUrl?: string;
  downloadUrl?: string;
  createdAt?: string;
}
