import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from "@angular/core/testing"
import {TimezoneItemComponent} from "./timezone-item.component"
import {DateTime, Settings} from "luxon"
import {Subject, Subscription} from "rxjs"

describe('Timezone Item Component', () => {
  let fixture: ComponentFixture<TimezoneItemComponent>
  let app: TimezoneItemComponent
  let saveNow = Settings.now

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TimezoneItemComponent],
    })
    fixture = TestBed.createComponent(TimezoneItemComponent)
    app = fixture.componentInstance
    app.refresh$ = new Subject<boolean>()
  }))

  afterEach(() => {
    Settings.now = saveNow
  })

  it('displays the timezone', () => {
    const fakeTimezoneName = 'America/New_York'
    app.timezone = fakeTimezoneName
    fixture.detectChanges()

    let titleElement = fixture.nativeElement.querySelector('.timezone-name')
    expect(titleElement.textContent).toContain(fakeTimezoneName)
  })

  it('displays localtime in desired format', () => {
    Settings.now = () => 1642882500000
    app.timezone = 'America/New_York'
    fixture.detectChanges()
    let dateTimeElement = fixture.nativeElement.querySelector('.local-time')
    expect(dateTimeElement.textContent).toEqual(' Sat, Jan 22, 03:15 PM ')
  })

  it('refreshes localtime when the refresh$ subject gets s next value', fakeAsync(() => {
    // set current time to one minutes ago
    const oneSecondAgo = DateTime.local().minus({minutes: 1}).toMillis()
    Settings.now = () => oneSecondAgo

    app.timezone = 'America/New_York'
    fixture.detectChanges()

    let dateTimeElement = fixture.nativeElement.querySelector('.local-time')
    let currentTime = dateTimeElement.textContent

    Settings.now = saveNow
    tick(1000)
    app.refresh$?.next(true)
    fixture.detectChanges()
    let latestTime = dateTimeElement.textContent

    expect(currentTime).not.toEqual(latestTime)
  }))

  it('unsubscribes when destroyed', () => {
    app.refreshSubscription = new Subscription()
    spyOn(app.refreshSubscription, 'unsubscribe')

    app.ngOnDestroy()

    expect(app.refreshSubscription.unsubscribe).toHaveBeenCalledTimes(1)
  })

  describe('background color depending on the time of the day', () => {
    const FEB_2_MIDNIGHT = 1643778000000
    const HOUR_IN_MILLISECONDS = 60 * 60 * 1000
    beforeEach(() => {
      app.timezone = 'America/New_York'
    })

    it('nighttime starts - is slategray starting at 10PM', () => {
      expectBackgroundColorAtTime('slategray', getUnixTimeForHour(22))
    })

    it('nighttime ends - is slategray right before 6AM', () => {
      expectBackgroundColorAtTime('slategray', getUnixTimeForHour(6) - 1)
    })

    it('morning starts - is aqua starting at 6AM', () => {
      expectBackgroundColorAtTime('aqua', getUnixTimeForHour(6))
    })

    it('morning ends - is aqua right before 8AM', () => {
      expectBackgroundColorAtTime('aqua', getUnixTimeForHour(8) - 1)
    })

    it('daytime starts - LightGreen starting at 8AM', () => {
      expectBackgroundColorAtTime('lightgreen', getUnixTimeForHour(8))
    })

    it('daytime ends - LightGreen until 6PM', () => {
      expectBackgroundColorAtTime('lightgreen', getUnixTimeForHour(18))
    })

    it('evening starts - is GoldenRod starting right after 7pm', () => {
      expectBackgroundColorAtTime('goldenrod', getUnixTimeForHour(18) + HOUR_IN_MILLISECONDS)
    })

    it('evening ends - is GoldenRod until right before 10pm', () => {
      expectBackgroundColorAtTime('goldenrod', getUnixTimeForHour(22) - 1)
    })

    function getUnixTimeForHour(hour: number) {
      return FEB_2_MIDNIGHT + hour * HOUR_IN_MILLISECONDS
    }

    function expectBackgroundColorAtTime(backgroundColor: string, unixTime: number) {
      Settings.now = () => unixTime
      fixture.detectChanges()

      let timezoneItemElement = fixture.nativeElement.querySelector('.timezone-item')
      expect(timezoneItemElement.style.backgroundColor).toEqual(backgroundColor)
    }
  })
})

