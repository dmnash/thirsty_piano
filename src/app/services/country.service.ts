import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private base = 'https://api.worldbank.org/v2';

  getCountryMeta(iso2: string): Observable<any> {
    const params = new HttpParams().set('format','json');
    return this.http.get<any>(`${this.base}/country/${iso2}`, { params }).pipe(map(([_, [c]]) => ({
      id: c.id,
      name: c.name,
      capital: c.capitalCity,
      region: c.region?.value,
      income: c.incomeLevel?.value
    })));
  }
  getPopAndGdp(idstring: string, ids: string[]): Observable<Record<string, number | null>> {
    const params = new HttpParams().set('format','json').set('source','2').set('mrv','1');
    const path = `${this.base}/country/${idstring}/indicator/${ids.join(';')}`;
    return this.http.get<any>(path, { params }).pipe(map(([_meta, rows]) => {
      const out: Record<string, number | null> = {};
      for (const r of rows) out[r.indicator.id] = r.value ?? null;
      return out;
    }));
  }
  constructor(private http: HttpClient) {}
}
