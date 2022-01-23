import {Component, OnInit} from "@angular/core"
import {TimeZoneService} from "./timezone.service"

@Component({
  selector: 'app-timezone-tracker',
  templateUrl: 'timezone-tracker.component.html',
  styleUrls: ['timezone-tracker.component.scss']
})
export class TimeZoneTrackerComponent implements OnInit{
  timeZonesList?: string[] = [];
  selectedLocation?: string;
  selectedTimeZones: string[] = []

  constructor(private timeZoneService: TimeZoneService) { }

  selectionChange(value: string) {
    this.selectedTimeZones.push(value)
  }

  ngOnInit(): void {
    this.timeZoneService.getLocations().subscribe(locations => {
      this.timeZonesList = locations.results
    })
  }
}
