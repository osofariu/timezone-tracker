import {Component, OnInit} from "@angular/core"
import {TimeZoneService} from "./timezone.service"

@Component({
  selector: 'app-timezone-tracker',
  templateUrl: 'timezone-tracker.component.html',
  styleUrls: ['timezone-tracker.component.scss']
})
export class TimeZoneTrackerComponent implements OnInit{
  timeZonesList: string[] = [];
  selectedLocation?: string;

  constructor(private timeZoneService: TimeZoneService) { }

  ngOnInit(): void {
    this.timeZoneService.getLocations().subscribe(locations => {
      this.timeZonesList = locations
    })
  }
}
