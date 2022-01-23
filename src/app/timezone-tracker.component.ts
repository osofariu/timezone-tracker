import {Component, OnInit} from "@angular/core"
import {TimeZoneService} from "./timezone.service"

@Component({
  selector: 'app-timezone-tracker',
  templateUrl: 'timezone-tracker.component.html',
  styleUrls: ['timezone-tracker.component.scss']
})
export class TimeZoneTrackerComponent implements OnInit{
  timeZonesList?: string[] = [];
  selectedTimeZones: string[] = []
  error?: string

  constructor(private timeZoneService: TimeZoneService) { }

  ngOnInit(): void {
    this.timeZoneService.getLocations().subscribe(response => {
      if (response.results) {
        this.timeZonesList = response.results
      } else {
        this.error = response.error || 'Unknown error'
      }
    })
  }

  onSelectedTimezone(timezone: string) {
    this.selectedTimeZones?.push(timezone)
    console.log('** ', timezone, this.selectedTimeZones)
  }
}
