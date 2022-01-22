import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing"
import {TimeZoneTrackerComponent} from "./timezone-tracker.component"
import {MatToolbarModule} from "@angular/material/toolbar"
import {TimeZoneService} from "./timezone.service"
import {MatOptionModule} from "@angular/material/core"
import {MatSelectModule} from "@angular/material/select"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {Component, Input} from "@angular/core"
import {By} from "@angular/platform-browser"
import {of} from "rxjs"
import {MatListModule} from "@angular/material/list"
import {MatCardModule} from "@angular/material/card"

@Component({
  selector: 'app-timezone',
  template: ''
})
class TimeZoneStub {
  @Input() public timezone?: string
}


describe('TimeZone Tracker', () => {
  let fixture: ComponentFixture<TimeZoneTrackerComponent>
  let app: TimeZoneTrackerComponent
  let timezoneServiceStub: Partial<TimeZoneService>

  timezoneServiceStub = {
    getLocations: () => of(["Australia/Sydney", "CET"])
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatOptionModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatListModule,
      ],
      declarations: [
        TimeZoneTrackerComponent,
        TimeZoneStub
      ],
      providers: [
        {provide: TimeZoneService, useValue: timezoneServiceStub}
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeZoneTrackerComponent)
    app = fixture.componentInstance
    fixture.detectChanges()
  })

  it('has title', () => {
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('mat-toolbar [data-testid=app-title]')?.textContent).toContain('Time Zone Tracker')
  })

  it('has toolbar', () => {
    expect(fixture.nativeElement.querySelector('mat-toolbar')).toBeTruthy()
  })

  it('has dropdown for timezones', () => {
    expect(fixture.nativeElement.querySelector('mat-toolbar mat-select')).toBeTruthy()
  })

  it('uses TimeZoneService to show user a list of timezone areas', async () => {
    await selectTimeZoneDropdown()
    const selectOptions = fixture.debugElement.queryAll(By.css('.mat-option-text'))

    expect(selectOptions.length).toEqual(2)
    expect(selectOptions[0].nativeElement.textContent).toContain('Australia/Sydney')
    expect(selectOptions[1].nativeElement.textContent).toContain('CET')
  })

  it('when selecting a timezone from the list, component remembers the selected value', async () => {
    await selectTimeZoneDropdown()
    await selectTimeZoneItem(1)

    expect(app.selectedLocation).toEqual('CET')
  })

  it('selecting a timezone should add a new timezone card for that timezone', async () => {
    await selectTimeZoneDropdown()
    await selectTimeZoneItem(1)

    let timezoneComponent = fixture.debugElement.query(By.css('app-timezone')).componentInstance
    expect(timezoneComponent.timezone).toBe('CET')
  })

  it('if not timezone is selected, the timezone card should not be present', () => {
    let timezoneComponent = fixture.debugElement.query(By.css('app-timezone'))?.componentInstance
    expect(timezoneComponent).toBeFalsy()
  })

  async function selectTimeZoneDropdown() {
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement
    trigger.click()
    fixture.detectChanges()
    await fixture.whenStable()
  }

  async function selectTimeZoneItem(itemNumber: number) {
    const options = document.querySelectorAll('.mat-select-panel mat-option')
    const secondOption = options.item(itemNumber) as HTMLElement
    secondOption.click()
    fixture.detectChanges()
    await fixture.whenStable()
  }
})
