import {from, map, Observable} from 'rxjs';
import {supabase} from './supabase.client';
import {Injectable} from '@angular/core';
import {Property} from '../model/property/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyRepository {
  findAll(): Observable<Property[]> {
    return from(supabase.from('property').select('*')).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Property[];
      })
    );
  }

  findById(id: string): Observable<Property> {
    return from(supabase.from('property').select('*').eq('id', id).single()).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Property;
      })
    );
  }

  create(property: Property): Observable<Property> {
    return from(supabase.from('property').insert([property]).select().single()).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Property;
      })
    );
  }

  update(id: string, property: Partial<Property>): Observable<Property> {
    return from(supabase.from('property').update(property).eq('id', id).select().single()).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Property;
      })
    );
  }

  delete(id: string): Observable<void> {
    return from(supabase.from('property').delete().eq('id', id)).pipe(
      map(response => {
        if (response.error) throw response.error;
        return;
      })
    );
  }
}
