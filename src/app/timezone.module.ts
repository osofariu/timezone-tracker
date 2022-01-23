import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';

import { TimeZoneTrackerComponent } from './timezone-tracker.component';
import { TimeZoneComponent } from './time-zone/timezone.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from "@angular/material/select";
import {TimeZoneService} from "./timezone.service"
import {HttpClientModule} from "@angular/common/http";
import {MatListModule} from "@angular/material/list";
import {TimezoneSelectorComponent} from "./timezone-selector/timezone-selector.component"

@NgModule({
  declarations: [
    TimeZoneTrackerComponent,
    TimeZoneComponent,
    TimezoneSelectorComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSelectModule,
    HttpClientModule,
    MatListModule,
  ],
  providers: [TimeZoneService],
  bootstrap: [TimeZoneTrackerComponent]
})
export class TimezoneModule { }
