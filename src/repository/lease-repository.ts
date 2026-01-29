import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Lease} from '../model/lease/lease';
import {Property} from '../model/property/property';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaseRepository {

  constructor(private readonly httpClient: HttpClient) {
  }

  findAll(): Observable<Lease[]> {
    return this.httpClient.get<Lease[]>('https://api.bailo.ch/property-management/leases');
  }

  findById(id: string): Observable<Lease> {
    return this.httpClient.get<Lease>('https://api.bailo.ch/property-management/leases' + id);
  }

  create(lease: Lease): Observable<Lease> {
    return this.httpClient.post<Lease>('https://api.bailo.ch/property-management/leases', lease);
  }

  update(id: string, lease: Partial<Lease>): Observable<Lease> {
    return this.httpClient.post<Lease>('https://api.bailo.ch/property-management/leases', lease);
  }

  delete(id: string): Observable<void> {
  return of(undefined);
  }
}
