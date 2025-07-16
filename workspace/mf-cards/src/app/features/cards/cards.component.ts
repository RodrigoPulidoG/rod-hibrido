import { Component } from '@angular/core';
import { Apod } from './models/apod.model';
import { ApodService } from './services/apod.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  days: number = 4;
  apods: Apod[] = [];
  isLoading: boolean = false;
  searchStarted: boolean = false;


  constructor(private apodService: ApodService) {}

  fetchImages(event?: Event): void {
    event?.preventDefault();

    if (this.days < 1 || this.days > 30) return;
    this.searchStarted = true;
    this.isLoading = true;

    this.apodService.getImagesFromLastDays(this.days).subscribe({
      next: (data) => {
        this.apods = data.filter(item => item.media_type === 'image');
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener imágenes:', error);
        this.isLoading = false;
      }
    });
  }
}
