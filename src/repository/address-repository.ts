import {from, map, Observable} from 'rxjs';
import {supabase} from './supabase.client';
import {Injectable} from '@angular/core';
import {Property} from '../model/property/property';
import {Address} from '../model/shared/address';
import {convertKeysToSnakeCase} from './mapper';

@Injectable({
  providedIn: 'root'
})
export class AddressRepository {
  create(address: Address): Observable<Address> {
    return from(supabase.from('address')
      .insert(convertKeysToSnakeCase(address))
      .select().single()).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Address;
      })
    );
  }

  update(address: Address): Observable<Address> {
    return from(supabase.from('address')
      .insert(convertKeysToSnakeCase(address)).select().single()).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Address;
      })
    );
  }
}
