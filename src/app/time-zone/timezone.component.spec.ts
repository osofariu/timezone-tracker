import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing"
import {TimeZoneComponent} from "./timezone.component"
import {DateTime, Settings} from "luxon"

describe('TimeZone Component',  () => {
  let fixture: ComponentFixture<TimeZoneComponent>
  let app: TimeZoneComponent

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TimeZoneComponent]
    })
    fixture = TestBed.createComponent(TimeZoneComponent);
    app = fixture.componentInstance;

    Settings.now = () => 1642882500000
  }))

  it('displays the timezone', () => {
    const fakeTimeZoneName = 'My Timezone'
    app.timezone = fakeTimeZoneName
    fixture.detectChanges()

    let timeZoneElement = fixture.nativeElement.querySelector('.timezone-name')
    expect(timeZoneElement.textContent).toContain(fakeTimeZoneName)
  })

  it('displays localtime in desired format', () => {
    app.timezone = 'America/New_York'
    fixture.detectChanges()

    let dateTimeElement = fixture.nativeElement.querySelector('.date-time')
    expect(dateTimeElement.textContent).toEqual('1/22/2022, 3:15 PM')
  })
})
