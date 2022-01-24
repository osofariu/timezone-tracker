import {Component, OnDestroy, OnInit} from "@angular/core"
import {TimezoneService} from "./timezone-service/timezone.service"
import {Subject} from "rxjs"

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
  refreshTime$?: Subject<boolean>

  constructor(private timezoneService: TimezoneService) { }

  ngOnInit(): void {
    this.getLocationsSubscription = this.timezoneService.getLocations().subscribe(response => {
      if (response.results) {
        this.timezonesList = response.results
      } else {
        this.error = response.error || 'Failed to retrieve timezones'
      }
    })
    this.refreshTime$ = new Subject<boolean>()
  }

  ngOnDestroy(): void {
    this.getLocationsSubscription.unsubscribe()
  }

  onSelectedTimezone(timezone: string) {
    this.selectedTimezones?.push(timezone)
  }

  onRefreshButton() {
    this.refreshTime$?.next(true)
  }
}
