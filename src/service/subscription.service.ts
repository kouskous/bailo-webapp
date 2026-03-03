import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  CheckoutSessionRequest,
  CheckoutSessionResponse,
  PortalSessionRequest,
  PortalSessionResponse,
  SubscriptionResponse
} from '../model/subscription/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private readonly baseUrl = 'https://api.bailo.ch/subscription';

  constructor(private readonly httpClient: HttpClient) {
  }

  createCheckoutSession(accountId: string, successUrl: string, cancelUrl: string): Observable<CheckoutSessionResponse> {
    const request: CheckoutSessionRequest = {accountId, successUrl, cancelUrl};
    return this.httpClient.post<CheckoutSessionResponse>(`${this.baseUrl}/checkout-session`, request);
  }

  createPortalSession(accountId: string, returnUrl: string): Observable<PortalSessionResponse> {
    const request: PortalSessionRequest = {accountId, returnUrl};
    return this.httpClient.post<PortalSessionResponse>(`${this.baseUrl}/portal-session`, request);
  }

  getSubscription(accountId: string): Observable<SubscriptionResponse> {
    return this.httpClient.get<SubscriptionResponse>(`${this.baseUrl}?accountId=${encodeURIComponent(accountId)}`);
  }
}
