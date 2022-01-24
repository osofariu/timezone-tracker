import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from "@angular/core/testing"
import {TimezoneItemComponent} from "./timezone-item.component"
import {DateTime, Settings} from "luxon"
import {Subject} from "rxjs"

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
    expect(dateTimeElement.textContent).toEqual(' Jan 22, 2022, 3:15 PM ')
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

    console.log(currentTime, latestTime)
    expect(currentTime).not.toEqual(latestTime)
  }))
})

