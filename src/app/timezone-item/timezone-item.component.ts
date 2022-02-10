import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core"
import {DateTime} from 'luxon'
import {Subject, Subscription} from "rxjs"

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone-item.component.html',
  styleUrls: ['./timezone-item.component.scss']
})
export class TimezoneItemComponent implements OnInit, OnDestroy {
  @Input() timezone?: string
  @Input() refresh$?: Subject<boolean>
  @Output() remove$: EventEmitter<string> = new EventEmitter<string>()

  localDateTime?: DateTime
  localDateTimeStr: string = ''
  refreshSubscription?: Subscription

  ngOnInit(): void {
    if (this.timezone) {
      this.refreshTime()
    }

    this.refreshSubscription = this.refresh$?.subscribe({
      next: (v) => {
        this.refreshTime()
      }
    })
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe()
  }

  removeTimezone() {
    console.log('*** remove timezone ')
    this.remove$?.emit(this.timezone)
  }

  refreshTime() {
    this.localDateTime = DateTime.local().setZone(this.timezone)
    this.localDateTimeStr = this.localDateTime
      .toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  }

  getTimeColor() {
    let currentHour = (this.localDateTime?.hour ?? 12)
    if (currentHour >= 22 || currentHour < 6) {
      return "SlateGray"
    }
    if (currentHour < 8) return "Aqua"
    if (currentHour > 18) return "GoldenRod"
    return "LightGreen"
  }
}
