import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaymentSchedule} from '../model/payment/payment-schedule';
import {Payment} from '../model/payment/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly schedulesUrl = 'https://api.bailo.ch/payment/schedules';
  private readonly paymentsUrl = 'https://api.bailo.ch/payment/payments';

  constructor(private readonly httpClient: HttpClient) {
  }

  findSchedulesByLease(leaseId: string): Observable<PaymentSchedule[]> {
    return this.httpClient.get<PaymentSchedule[]>(`${this.schedulesUrl}?leaseId=${encodeURIComponent(leaseId)}`);
  }

  findScheduleById(id: string): Observable<PaymentSchedule> {
    return this.httpClient.get<PaymentSchedule>(`${this.schedulesUrl}/${id}`);
  }

  createSchedule(schedule: PaymentSchedule): Observable<PaymentSchedule> {
    return this.httpClient.post<PaymentSchedule>(this.schedulesUrl, schedule);
  }

  updateSchedule(schedule: PaymentSchedule): Observable<PaymentSchedule> {
    return this.httpClient.put<PaymentSchedule>(this.schedulesUrl, schedule);
  }

  findPaymentsByLease(leaseId: string): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`${this.paymentsUrl}?leaseId=${encodeURIComponent(leaseId)}`);
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
