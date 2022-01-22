import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing"
import {TimeZoneComponent} from "./timezone.component"

describe('TimeZone Component',  () => {
  let fixture: ComponentFixture<TimeZoneComponent>
  let app: TimeZoneComponent

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TimeZoneComponent]
    })
    fixture = TestBed.createComponent(TimeZoneComponent);
    app = fixture.componentInstance;
  }))

  it('displays the timezone', () => {
    const fakeTimeZoneName = 'My Timezone'
    app.timezone = fakeTimeZoneName
    fixture.detectChanges()

    let timeZoneElement = fixture.nativeElement.querySelector('.timezone-name')
    console.log('*** ', timeZoneElement)
    expect(timeZoneElement.textContent).toContain(fakeTimeZoneName)
  })
})
