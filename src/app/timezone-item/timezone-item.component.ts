import {Component, Input, OnDestroy, OnInit} from "@angular/core"
import {DateTime} from 'luxon'
import {Observable, Subject, Subscription} from "rxjs"

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone-item.component.html',
  styleUrls: ['./timezone-item.component.scss']
})
export class TimezoneItemComponent implements OnInit, OnDestroy {
  @Input() timezone?: string;
  @Input() refresh$?: Subject<boolean>
  localTime: string = ''
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

  refreshTime() {
    const localTimeDate = DateTime.local().setZone(this.timezone)
    // this.localTime = localTimeDate.toLocaleString(DateTime.DATETIME_MED)
    this.localTime = localTimeDate.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
  }
}
