import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';

import { TimeZoneTrackerComponent } from './timezone-tracker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from "@angular/material/select";
import {TimeZoneService} from "./timezone.service"

@NgModule({
  declarations: [
    TimeZoneTrackerComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [TimeZoneService],
  bootstrap: [TimeZoneTrackerComponent]
})
export class TimezoneModule { }
