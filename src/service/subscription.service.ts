import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

interface PortalSessionResponse {
  url: string;
}

interface SubscriptionResponse {
  id: string;
  accountId: string;
  providerCustomerId: string;
  providerSubscriptionId: string;
  priceId: string;
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'INCOMPLETE' | 'INCOMPLETE_EXPIRED' | 'TRIALING' | 'UNPAID' | 'PAUSED' | 'UNKNOWN';
  currentPeriodEnd: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private readonly baseUrl = 'https://api.bailo.ch/subscription';

  constructor(private readonly httpClient: HttpClient) {
  }

  createCheckoutSession(accountId: string, successUrl: string, cancelUrl: string): Observable<CheckoutSessionResponse> {
    return this.httpClient.post<CheckoutSessionResponse>(`${this.baseUrl}/checkout-session`, {
      accountId,
      successUrl,
      cancelUrl
    });
  }

  createPortalSession(accountId: string, returnUrl: string): Observable<PortalSessionResponse> {
    return this.httpClient.post<PortalSessionResponse>(`${this.baseUrl}/portal-session`, {
      accountId,
      returnUrl
    });
  }

  getSubscription(accountId: string): Observable<SubscriptionResponse> {
    return this.httpClient.get<SubscriptionResponse>(`${this.baseUrl}?accountId=${encodeURIComponent(accountId)}`);
  }
}
