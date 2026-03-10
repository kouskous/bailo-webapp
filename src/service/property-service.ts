import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Property } from '../model/property/property';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private readonly httpClient: HttpClient) {}

  create(property: Property): Observable<Property> {
    return this.httpClient.post<Property>(
      'https://api.bailo.ch/property-management/properties',
      property,
    );
  }

  update(property: Property): Observable<Property> {
    return this.httpClient.put<Property>(
      'https://api.bailo.ch/property-management/properties',
      property,
    );
  }

  findAll(accountId: string) {
    return this.httpClient.get<Property[]>(
      'https://api.bailo.ch/property-management/properties?accountId=' +
        encodeURI(accountId),
    );
  }

  findById(propertyId: string) {
    return this.httpClient.get<Property>(
      'https://api.bailo.ch/property-management/properties/' + propertyId,
    );
  }
}
