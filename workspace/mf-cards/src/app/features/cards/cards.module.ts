import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';
import { ApodCardComponent } from './presentation/components/apod-card/apod-card.component';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    CardsComponent,
    ApodCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    CardsRoutingModule,
    FormsModule,
  ],
  exports: [
    CardsComponent,
    ApodCardComponent
  ],
  bootstrap: [CardsComponent]
})
export class CardsModule { }
