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
}
