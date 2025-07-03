import {from, map, Observable} from 'rxjs';
import {supabase} from './supabase.client';
import {Injectable} from '@angular/core';
import {Property} from '../model/property/property';
import {convertKeysToSnakeCase} from './mapper';

@Injectable({
  providedIn: 'root'
})
export class PropertyRepository {
  create(property: Property): Observable<Property> {
    return from(supabase.from('property').insert(convertKeysToSnakeCase(property)).select().single()).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Property;
      })
    );
  }

  update(property: Property): Observable<Property> {
    return from(supabase.from('property').update(convertKeysToSnakeCase(property)).eq('id', property.id).select().single()).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Property;
      })
    );
  }

}
