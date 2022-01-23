import {Component, OnInit} from "@angular/core"
import {TimezoneService} from "./timezone-service/timezone.service"

@Component({
  selector: 'app-timezone-tracker',
  templateUrl: 'timezone-tracker.component.html',
  styleUrls: ['timezone-tracker.component.scss']
})
export class TimezoneTrackerComponent implements OnInit{
  timezonesList?: string[] = [];
  selectedTimezones: string[] = []
  error?: string

  constructor(private timezoneService: TimezoneService) { }

  ngOnInit(): void {
    this.timezoneService.getLocations().subscribe(response => {
      if (response.results) {
        this.timezonesList = response.results
      } else {
        this.error = response.error || 'Unknown error'
      }
    })
  }

  onSelectedTimezone(timezone: string) {
    this.selectedTimezones?.push(timezone)
  }
}
