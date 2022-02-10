import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing"
import {By} from "@angular/platform-browser"
import {TimezoneSelectorComponent} from "./timezone-selector.component"
import {MatSelectModule} from "@angular/material/select"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {MatAutocompleteModule} from "@angular/material/autocomplete"
import {MatInputModule} from "@angular/material/input"
import {first} from "rxjs"
import {ReactiveFormsModule} from "@angular/forms"

describe('Timezone Selector', () => {
  let fixture: ComponentFixture<TimezoneSelectorComponent>
  let app: TimezoneSelectorComponent

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TimezoneSelectorComponent],
      imports: [
        MatSelectModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule,
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TimezoneSelectorComponent)
    app = fixture.componentInstance
    app.availableTimezones = ['America/New_York', 'Europe/Bucharest']
    fixture.detectChanges()
  })

  describe('autocomplete - user can see selection ', () => {

    it('should see the entire list when user clicks on it', async () => {
      fixture.detectChanges();
      const timezoneInputElement =  fixture.debugElement.query(By.css('input[data-testid="timezone-input"]')).nativeElement
      timezoneInputElement.dispatchEvent(new Event('focusin'))
      timezoneInputElement.dispatchEvent(new Event('click'))
      fixture.detectChanges()

      const matOptions = document.querySelectorAll('mat-option')
      expect(matOptions.length).toEqual(2)
    })

    it('should emit "America/New_York" when user types A', async () => {
      let selectedTimezone: string
      app.selectedTimezone.pipe(first())
        .subscribe((timezoneInput: string) => {
          selectedTimezone = timezoneInput
        })

      await autoCompleteTimezoneItem(fixture, 'A', 0)

      expect(selectedTimezone!).toEqual('America/New_York')
    })

    it('should emit "America/New_York" when user types Yor', async ()  => {
      let selectedTimezone: string
      app.selectedTimezone.pipe(first())
        .subscribe((timezoneInput: string) => {
          selectedTimezone = timezoneInput
        })

      await autoCompleteTimezoneItem(fixture, 'Yor', 0)

      fixture.detectChanges()
      expect(selectedTimezone!).toEqual('America/New_York')
    })

    it('should emit "Europe/Bucharest" when user types Buc', async () => {
      let selectedTimezone: string
      app.selectedTimezone.pipe(first())
        .subscribe((timezoneInput: string) => {
          selectedTimezone = timezoneInput
        })

      await autoCompleteTimezoneItem(fixture, 'Buc', 0)

      expect(selectedTimezone!).toEqual('Europe/Bucharest')
    })

    async function autoCompleteTimezoneItem(fixture: any, itemText: string, itemNumber: number) {
      fixture.detectChanges();
      const timezoneInputElement = fixture.debugElement.query(By.css('input')).nativeElement // Returns DebugElement

      timezoneInputElement.dispatchEvent(new Event('focusin'))
      timezoneInputElement.value = itemText
      timezoneInputElement.dispatchEvent(new Event('input'))

      fixture.detectChanges()
      await fixture.whenStable()
      fixture.detectChanges()

      const matOptions = document.querySelectorAll('mat-option')
      expect(matOptions).toBeTruthy()

      const specificOption = matOptions[itemNumber] as HTMLElement
      specificOption.click()
      fixture.detectChanges()
    }
  })
})
