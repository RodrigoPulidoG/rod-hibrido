import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CardsModule } from './app/features/cards/cards.module';

platformBrowserDynamic()
  .bootstrapModule(CardsModule)
  .catch(err => console.error(err));
