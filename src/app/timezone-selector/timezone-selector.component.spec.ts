import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing"
import {By} from "@angular/platform-browser"
import {TimezoneSelectorComponent} from "./timezone-selector.component"
import {MatSelectModule} from "@angular/material/select"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {selectTimezoneDropdown, selectTimezoneItem} from "./test-helpers"

describe('Timezone Selector',  () => {
  let fixture: ComponentFixture<TimezoneSelectorComponent>
  let app: TimezoneSelectorComponent

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TimezoneSelectorComponent],
      imports: [
        MatSelectModule,
        BrowserAnimationsModule
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TimezoneSelectorComponent);
    app = fixture.componentInstance;
    app.availableTimezones = ['America/New_York', 'Europe/Bucharest']
    fixture.detectChanges()
  })

  it('has dropdown for timezones', () => {
    const dropDown = fixture.debugElement.queryAll(By.css('mat-toolbar mat-select'))
    expect(dropDown).toBeTruthy()
  })

  it('when selecting a timezone from the list, component remembers the selected value', async () => {
    await selectTimezoneDropdown(fixture)
    await selectTimezoneItem(fixture,1)

    expect(app.selectedLocation).toEqual('Europe/Bucharest')
  })


})
