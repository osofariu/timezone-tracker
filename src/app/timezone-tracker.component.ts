import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core"
import {TimezoneService} from "./timezone-service/timezone.service"
import {interval, Subject, Subscription, tap} from "rxjs"

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
  s?: Subscription
  refreshAutomatically = false

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
    this.s?.unsubscribe()
  }

  onSelectedTimezone(timezone: string) {
    this.selectedTimezones?.push(timezone)
  }

  onRefreshButton() {
    this.refreshAutomatically = !this.refreshAutomatically
    if (this.refreshAutomatically) {
      this.s = this.doRefresh()
    } else {
      this.dontRefresh()
    }
  }

  doRefresh() : Subscription {
    return this.s = this.refreshTimePeriodically(1000)
      .subscribe(() => {})
  }

  dontRefresh() {
    this.s?.unsubscribe()
  }

  refreshTimePeriodically(period: number) {
    return interval(period).pipe(
      tap(() => {
        this.refreshTime$?.next(true)
      }))
  }
}
