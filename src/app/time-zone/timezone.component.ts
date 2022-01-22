import {Component, Input, OnInit} from "@angular/core"
import {DateTime, Settings} from 'luxon'

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss']
})
export class TimeZoneComponent implements OnInit{
  @Input() timezone?: string;
  localTime: string = ''

  ngOnInit(): void {
    if (this.timezone) {
      const localTimeDate = DateTime.local().setZone(this.timezone)
      this.localTime = localTimeDate.toLocaleString(DateTime.DATETIME_SHORT)
    }
  }
}
