import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { TimezoneTrackerModule } from './app/timezone-tracker.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(TimezoneTrackerModule)
  .catch(err => console.error(err));
