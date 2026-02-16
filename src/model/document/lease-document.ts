export type LeaseDocumentType = 'RENT_NOTICE' | 'RENT_RECEIPT' | 'OTHER';
export type LeaseDocumentStatus = 'PENDING' | 'READY' | 'FAILED';

export interface LeaseDocument {
  id?: string;
  leaseId?: string;
  type?: LeaseDocumentType | string;
  status?: LeaseDocumentStatus | string;
  label?: string;
  period?: string;
  dueDate?: string;
  issuedAt?: string;
  fileName?: string;
  viewUrl?: string;
  downloadUrl?: string;
  createdAt?: string;
}
