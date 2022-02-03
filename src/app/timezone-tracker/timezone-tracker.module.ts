import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {MatToolbarModule} from '@angular/material/toolbar'

import {TimezoneTrackerComponent} from './timezone-tracker.component'
import {TimezoneItemComponent} from '../timezone-item/timezone-item.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatSelectModule} from "@angular/material/select"
import {TimezoneService} from "../timezone-service/timezone.service"
import {HttpClientModule} from "@angular/common/http"
import {MatListModule} from "@angular/material/list"
import {TimezoneSelectorComponent} from "../timezone-selector/timezone-selector.component"
import {MatButtonModule} from "@angular/material/button"
import {MatAutocompleteModule} from "@angular/material/autocomplete"
import {MatInputModule} from "@angular/material/input"
import {ReactiveFormsModule} from "@angular/forms"

@NgModule({
  declarations: [
    TimezoneTrackerComponent,
    TimezoneItemComponent,
    TimezoneSelectorComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSelectModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [TimezoneService],
  bootstrap: [TimezoneTrackerComponent]
})
export class TimezoneTrackerModule { }
