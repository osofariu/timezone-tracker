import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing"
import {TimezoneItemComponent} from "./timezone-item.component"
import {Settings} from "luxon"

describe('Timezone Component',  () => {
  let fixture: ComponentFixture<TimezoneItemComponent>
  let app: TimezoneItemComponent

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TimezoneItemComponent],
    })
    fixture = TestBed.createComponent(TimezoneItemComponent);
    app = fixture.componentInstance;

    Settings.now = () => 1642882500000
  }))

  it('displays the timezone as title', () => {
    const fakeTimezoneName = 'America/New_York'
    app.timezone = fakeTimezoneName
    fixture.detectChanges()

    let titleElement = fixture.nativeElement.querySelector('.timezone-name')
    expect(titleElement.textContent).toContain(fakeTimezoneName)
  })

  it('displays localtime in desired format as a subtitle', () => {
    app.timezone = 'America/New_York'
    fixture.detectChanges()
    let dateTimeElement = fixture.nativeElement.querySelector('.local-time')
    expect(' 1/22/2022, 3:15 PM ').toContain(dateTimeElement.textContent)
  })
})
