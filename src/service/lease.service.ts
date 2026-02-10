import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Lease} from '../model/lease/lease';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findAll(propertyId: string): Observable<Lease[]> {
    return this.httpClient.get<Lease[]>('https://api.bailo.ch/lease-management/leases?propertyId=' + encodeURI(propertyId));
  }

  findById(id: string): Observable<Lease> {
    return this.httpClient.get<Lease>('https://api.bailo.ch/lease-management/leases/' + id);
  }

  create(lease: Lease): Observable<Lease> {
    return this.httpClient.post<Lease>('https://api.bailo.ch/lease-management/leases', lease);
  }

  update(lease: Lease): Observable<Lease> {
    return this.httpClient.put<Lease>('https://api.bailo.ch/lease-management/leases', lease);
  }

  delete(id: string): Observable<void> {
  return of(undefined);
  }
}
