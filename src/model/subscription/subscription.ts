export type SubscriptionStatus =
  | 'ACTIVE'
  | 'PAST_DUE'
  | 'CANCELED'
  | 'INCOMPLETE'
  | 'INCOMPLETE_EXPIRED'
  | 'TRIALING'
  | 'UNPAID'
  | 'PAUSED'
  | 'NONE'
  | 'UNKNOWN';

export interface CheckoutSessionRequest {
  accountId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface PortalSessionRequest {
  accountId: string;
  returnUrl: string;
}

export interface PortalSessionResponse {
  url: string;
}

export interface SubscriptionResponse {
  id?: string;
  accountId?: string;
  providerCustomerId?: string;
  providerSubscriptionId?: string;
  priceId?: string;
  status?: SubscriptionStatus;
  currentPeriodEnd?: string;
  createdAt?: string;
  updatedAt?: string;
}
