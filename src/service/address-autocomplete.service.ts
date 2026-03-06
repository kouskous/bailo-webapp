import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddressAutocompleteSuggestion} from '../model/shared/address-autocomplete';
import {Address} from '../model/shared/address';

@Injectable({
  providedIn: 'root'
})
export class AddressAutocompleteService {

  private readonly baseUrl = 'https://api.bailo.ch/property-management/addresses';

  constructor(private readonly httpClient: HttpClient) {
  }

  autocomplete(input: string): Observable<AddressAutocompleteSuggestion[]> {
    return this.httpClient.get<AddressAutocompleteSuggestion[]>(`${this.baseUrl}/autocomplete?input=${encodeURIComponent(input)}`);
  }

  getDetails(placeId: string): Observable<Address> {
    return this.httpClient.get<Address>(`${this.baseUrl}/details?placeId=${encodeURIComponent(placeId)}`);
  }
}

