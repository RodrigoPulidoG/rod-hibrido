import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Apod } from '../models/apod.model';

@Injectable({ providedIn: 'root' })
export class ApodApiService {
  private apiKey = 'LVLZIMyCdaiy07Fpy9ZaLPpW90sNQSttk1BZMDmF';

  constructor(private http: HttpClient) {}

  getRandomImage(): Observable<Apod | null> {
    const url = `https://api.nasa.gov/planetary/apod?count=1&api_key=${this.apiKey}`;
    return this.http.get<Apod[]>(url).pipe(
      map(([item]) => item.media_type === 'image' ? item : null),
      catchError(() => of(null))
    );
  }
}
