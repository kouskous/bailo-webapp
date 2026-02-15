import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Lease} from '../model/lease/lease';
import {HttpClient} from '@angular/common/http';
import {Page} from '../model/shared/page';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {
  private readonly baseUrl = 'https://api.bailo.ch/lease-management/leases';

  constructor(private readonly httpClient: HttpClient) {
  }

  findAll(
    propertyId: string,
    options?: { status?: string; page?: number; size?: number }
  ): Observable<Page<Lease>> {
    const params = new URLSearchParams();
    params.set('propertyId', propertyId);
    params.set('page', String(options?.page ?? 0));
    params.set('size', String(options?.size ?? 20));
    if (options?.status) {
      params.set('status', options.status);
    }
    return this.httpClient.get<Page<Lease>>(`${this.baseUrl}?${params.toString()}`);
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

  terminate(leaseId: string): Observable<Lease> {
    return this.httpClient.put<Lease>(`${this.baseUrl}/${leaseId}/terminate`, {});
  }

  delete(id: string): Observable<void> {
    return of(undefined);
  }
}
