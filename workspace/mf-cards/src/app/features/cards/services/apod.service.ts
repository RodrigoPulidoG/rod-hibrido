// src/data/services/apod.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Apod } from 'src/app/features/cards/models/apod.model';

@Injectable({ providedIn: 'root' })
export class ApodService {
  private baseUrl = 'https://api.nasa.gov/planetary/apod';
  private apiKey = 'LVLZIMyCdaiy07Fpy9ZaLPpW90sNQSttk1BZMDmF';

  constructor(private http: HttpClient) {}

  getImagesFromLastDays(days: number): Observable<Apod[]> {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const format = (d: Date) => d.toISOString().split('T')[0];

  const isSingleDay = days <= 1;
  const url = isSingleDay
    ? `${this.baseUrl}?api_key=${this.apiKey}&date=${format(endDate)}`
    : `${this.baseUrl}?api_key=${this.apiKey}&start_date=${format(startDate)}&end_date=${format(endDate)}`;

  return this.http.get<Apod[] | Apod>(url).pipe(
    map((response: any) => Array.isArray(response) ? response : [response])
  );
}

}
