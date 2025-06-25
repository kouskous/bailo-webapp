import {Injectable} from '@angular/core';
import {from, map, Observable} from 'rxjs';
import {supabase} from './supabase.client';
import {Tenant} from '../model/tenant/tenant';

@Injectable({
  providedIn: 'root'
})
export class TenantRepository {
  findAll(): Observable<Tenant[]> {
    return from(supabase.from('tenants').select('*')).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Tenant[];
      })
    );
  }

  findById(id: string): Observable<Tenant> {
    return from(supabase.from('tenants').select('*').eq('id', id).single()).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Tenant;
      })
    );
  }

  create(tenant: Tenant): Observable<Tenant> {
    return from(supabase.from('tenants').insert([tenant]).select().single()).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Tenant;
      })
    );
  }

  update(id: string, tenant: Partial<Tenant>): Observable<Tenant> {
    return from(supabase.from('tenants').update(tenant).eq('id', id).select().single()).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Tenant;
      })
    );
  }

  delete(id: string): Observable<void> {
    return from(supabase.from('tenants').delete().eq('id', id)).pipe(
      map(response => {
        if (response.error) throw response.error;
        return;
      })
    );
  }
}
