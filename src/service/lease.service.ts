import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Lease} from '../model/lease/lease';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {
  private readonly baseUrl = 'https://api.bailo.ch/lease-management/leases';

  constructor(private readonly httpClient: HttpClient) {
  }

  findAll(propertyId: string): Observable<Lease[]> {
    return this.httpClient.get<Lease[]>(`${this.baseUrl}?propertyId=${encodeURIComponent(propertyId)}`);
  }

  findById(leaseId: string): Observable<Lease> {
    return this.httpClient.get<Lease>(`${this.baseUrl}/${leaseId}`);
  }

  create(lease: Lease): Observable<Lease> {
    return this.httpClient.post<Lease>(this.baseUrl, lease);
  }

  update(lease: Lease): Observable<Lease> {
    return this.httpClient.put<Lease>(this.baseUrl, lease);
  }

  confirm(leaseId: string): Observable<Lease> {
    return this.httpClient.put<Lease>(`${this.baseUrl}/${leaseId}/confirm`, {});
  }

  archive(leaseId: string): Observable<Lease> {
    return this.httpClient.put<Lease>(`${this.baseUrl}/${leaseId}/archive`, {});
  }

  delete(id: string): Observable<void> {
    return of(undefined);
  }
}
