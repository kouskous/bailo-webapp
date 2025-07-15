import {from, map, Observable} from 'rxjs';
import {supabase} from './supabase.client';
import {Injectable} from '@angular/core';
import {Property} from '../model/property/property';
import {convertKeysToSnakeCase} from './mapper';
import {AuthService, User} from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class PropertyRepository {
  private user: User | null | undefined;

  constructor(private readonly auth: AuthService) {
    auth.user$.subscribe(user => this.user = user);
  }

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
