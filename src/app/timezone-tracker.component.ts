import {Component, OnInit} from "@angular/core"
import {TimeZoneService, TzLocation} from "./timezone.service"

@Component({
  selector: 'app-timezone-tracker',
  templateUrl: 'timezone-tracker.component.html',
  styleUrls: ['timezone-tracker.component.scss']
})
export class TimeZoneTrackerComponent implements OnInit{
  locations: TzLocation[] = [];
  selectedLocation?: string;

  constructor(private timeZoneService: TimeZoneService) { }

  ngOnInit(): void {
    this.locations = this.timeZoneService.getLocations()
  }

}
