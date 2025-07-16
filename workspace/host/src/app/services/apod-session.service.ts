import { Injectable } from '@angular/core';
import { Apod } from '../models/apod.model';

@Injectable({ providedIn: 'root' })
export class ApodSessionService {
  private readonly key = 'imgList';

  getImages(): Apod[] {
    const raw = sessionStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }

  setImages(images: Apod[]): void {
    sessionStorage.setItem(this.key, JSON.stringify(images));
  }

  clearImages(): void {
    sessionStorage.removeItem(this.key);
  }
}
