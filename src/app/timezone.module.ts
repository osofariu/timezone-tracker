import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TimeZoneTrackerComponent } from './timezone-tracker.component';

@NgModule({
  declarations: [
    TimeZoneTrackerComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [TimeZoneTrackerComponent]
})
export class TimezoneModule { }
