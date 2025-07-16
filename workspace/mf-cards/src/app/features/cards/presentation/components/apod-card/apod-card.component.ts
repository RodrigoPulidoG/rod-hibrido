import { Component, Input } from '@angular/core';
import { Apod } from '../../../models/apod.model';

@Component({
  selector: 'app-apod-card',
  templateUrl: './apod-card.component.html',
  styleUrls: ['./apod-card.component.scss']
})
export class ApodCardComponent {
  @Input() data!: Apod;
}
