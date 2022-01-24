import {Component, OnDestroy, OnInit} from "@angular/core"
import {TimezoneService} from "./timezone-service/timezone.service"

@Component({
  selector: 'app-timezone-tracker',
  templateUrl: 'timezone-tracker.component.html',
  styleUrls: ['timezone-tracker.component.scss']
})
export class TimezoneTrackerComponent implements OnInit, OnDestroy {
  timezonesList?: string[] = [];
  selectedTimezones: string[] = []
  error?: string
  getLocationsSubscription: any

  constructor(private timezoneService: TimezoneService) { }

  ngOnInit(): void {
    this.getLocationsSubscription = this.timezoneService.getLocations().subscribe(response => {
      if (response.results) {
        this.timezonesList = response.results
      } else {
        this.error = response.error || 'Unknown error'
      }
    })
  }

  ngOnDestroy(): void {
    this.getLocationsSubscription.unsubscribe()
  }

  onSelectedTimezone(timezone: string) {
    this.selectedTimezones?.push(timezone)
  }
}
