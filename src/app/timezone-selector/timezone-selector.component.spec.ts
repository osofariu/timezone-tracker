import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing"
import {By} from "@angular/platform-browser"
import {TimezoneSelectorComponent} from "./timezone-selector.component"
import {MatSelectModule} from "@angular/material/select"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

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
    await selectTimezoneDropdown()
    await selectTimezoneItem(1)

    expect(app.selectedLocation).toEqual('Europe/Bucharest')
  })

  async function selectTimezoneDropdown() {
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement
    trigger.click()
    fixture.detectChanges()
    await fixture.whenStable().then(() => {
      const selectPanel =  fixture.debugElement.query(By.css('.mat-select-panel'))
      expect(selectPanel).toBeTruthy()
    });
  }

  async function selectTimezoneItem(itemNumber: number) {
    const options = document.querySelectorAll('.mat-select-panel mat-option')
    const secondOption = options.item(itemNumber) as HTMLElement
    secondOption.click()
    fixture.detectChanges()
    await fixture.whenStable()
  }
})
