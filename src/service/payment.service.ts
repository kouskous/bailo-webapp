import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentSchedule } from '../model/payment/payment-schedule';
import { Payment } from '../model/payment/payment';
import { Page } from '../model/shared/page';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly schedulesUrl = 'https://api.bailo.ch/payment/schedules';
  private readonly paymentsUrl = 'https://api.bailo.ch/payment/payments';

  constructor(private readonly httpClient: HttpClient) {}

  findSchedulesByLease(
    leaseId: string,
    page = 0,
    size = 20,
  ): Observable<Page<PaymentSchedule>> {
    return this.httpClient.get<Page<PaymentSchedule>>(
      `${this.schedulesUrl}?leaseId=${encodeURIComponent(leaseId)}&page=${page}&size=${size}`,
    );
  }

  findScheduleById(id: string): Observable<PaymentSchedule> {
    return this.httpClient.get<PaymentSchedule>(`${this.schedulesUrl}/${id}`);
  }

  findPaymentsByLease(
    leaseId: string,
    page = 0,
    size = 20,
  ): Observable<Page<Payment>> {
    return this.httpClient.get<Page<Payment>>(
      `${this.paymentsUrl}?leaseId=${encodeURIComponent(leaseId)}&page=${page}&size=${size}`,
    );
  }

  findPaymentById(id: string): Observable<Payment> {
    return this.httpClient.get<Payment>(`${this.paymentsUrl}/${id}`);
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.httpClient.post<Payment>(this.paymentsUrl, payment);
  }

  updatePayment(payment: Payment): Observable<Payment> {
    return this.httpClient.put<Payment>(this.paymentsUrl, payment);
  }
}
