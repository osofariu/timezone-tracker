import {Component, Input, OnInit} from "@angular/core"
import {DateTime} from 'luxon'

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone-item.component.html',
  styleUrls: ['./timezone-item.component.scss']
})
export class TimezoneItemComponent implements OnInit{
  @Input() timezone?: string;
  localTime: string = ''

  ngOnInit(): void {
    if (this.timezone) {
      const localTimeDate = DateTime.local().setZone(this.timezone)
      this.localTime = localTimeDate.toLocaleString(DateTime.DATETIME_SHORT)
    }
  }
}
