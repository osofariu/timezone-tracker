import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing"
import {TimeZoneComponent} from "./timezone.component"
import {DateTime, Settings} from "luxon"
import {MatCardModule} from "@angular/material/card"

describe('TimeZone Component',  () => {
  let fixture: ComponentFixture<TimeZoneComponent>
  let app: TimeZoneComponent

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TimeZoneComponent],
    })
    fixture = TestBed.createComponent(TimeZoneComponent);
    app = fixture.componentInstance;

    Settings.now = () => 1642882500000
  }))

  it('displays the timezone as title', () => {
    const fakeTimeZoneName = 'America/New_York'
    app.timezone = fakeTimeZoneName
    fixture.detectChanges()

    let titleElement = fixture.nativeElement.querySelector('.timezone-name')
    expect(titleElement.textContent).toContain(fakeTimeZoneName)
  })

  it('displays localtime in desired format as a subtitle', () => {
    app.timezone = 'America/New_York'
    fixture.detectChanges()
    let dateTimeElement = fixture.nativeElement.querySelector('.local-time')
    expect(' 1/22/2022, 3:15 PM ').toContain(dateTimeElement.textContent)
  })
})
