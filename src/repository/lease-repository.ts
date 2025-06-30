import {Injectable} from '@angular/core';
import {from, map, Observable} from 'rxjs';
import {Lease} from '../model/lease/lease';
import {supabase} from './supabase.client';
import {convertKeysToCamelCase} from './mapper';

@Injectable({
  providedIn: 'root'
})
export class LeaseRepository {

  findAll(): Observable<Lease[]> {
    return from(supabase.from('lease')
      .select(`*,
        property:property (*, address:address (*)),
        tenants: tenant (*, address:address (*))
      `)
    ).pipe(
      map((response: any) => {
        if (response.error) throw response.error;
        return convertKeysToCamelCase<Lease[]>(response.data);
      })
    );
  }

  findById(id: string): Observable<Lease> {
    return from(supabase.from('lease')
      .select(`*,
        property:property (*, address:address (*)),
        tenants: tenant (*, address:address (*))
      `).eq('id', id).single()
    ).pipe(
      map((response: any) => {
        if (response.error) throw response.error;
        return convertKeysToCamelCase<Lease>(response.data);
      })
    );
  }

  create(lease: Lease): Observable<Lease> {
    return from(supabase.from('lease').insert([lease]).select().single()).pipe(
      map((response: any) => {
        if (response.error) throw response.error;
        return response.data as Lease;
      })
    );
  }

  update(id: string, lease: Partial<Lease>): Observable<Lease> {
    return from(supabase.from('lease').update(lease).eq('id', id).select().single()).pipe(
      map((response: any) => {
        if (response.error) throw response.error;
        return response.data as Lease;
      })
    );
  }

  delete(id: string): Observable<void> {
    return from(supabase.from('lease').delete().eq('id', id)).pipe(
      map((response: any) => {
        if (response.error) throw response.error;
        return;
      })
    );
  }
}
