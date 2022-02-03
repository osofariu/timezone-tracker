import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync
} from "@angular/core/testing"
import {TimezoneTrackerComponent} from "./timezone-tracker.component"
import {MatToolbarModule} from "@angular/material/toolbar"
import {TimezoneService} from "../timezone-service/timezone.service"
import {MatOptionModule} from "@angular/material/core"
import {MatSelectModule} from "@angular/material/select"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {Component, Input} from "@angular/core"
import {By} from "@angular/platform-browser"
import {of, Subject, Subscription} from "rxjs"
import {MatListModule} from "@angular/material/list"
import {TimezoneSelectorComponent} from "../timezone-selector/timezone-selector.component"
import {selectTimezoneDropdown, selectTimezoneItem} from "../timezone-selector/test-helpers"

@Component({
  selector: 'app-timezone',
  template: ''
})
class TimezoneStub {
  @Input() public timezone?: string
  @Input() refresh$?: Subject<boolean>
}

describe('Timezone Tracker', () => {
  let fixture: ComponentFixture<TimezoneTrackerComponent>
  let app: TimezoneTrackerComponent

  function setupTestBed(timezoneServiceStub: any) {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatOptionModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatListModule,
      ],
      declarations: [
        TimezoneTrackerComponent,
        TimezoneSelectorComponent,
        TimezoneStub
      ],
      providers: [
        {provide: TimezoneService, useValue: timezoneServiceStub}
      ]
    }).compileComponents()
  }

  describe('with successful timezone service', function () {

    beforeEach(waitForAsync(() => {
      setupTestBed({
        getLocations: () => of({results: ["Australia/Sydney", "CET"]})
      })
    }))

    beforeEach(() => {
      fixture = TestBed.createComponent(TimezoneTrackerComponent)
      app = fixture.componentInstance
      fixture.detectChanges()
    })

    it('has title', () => {
      const compiled = fixture.nativeElement as HTMLElement
      expect(compiled.querySelector('mat-toolbar [data-testid=app-title]')?.textContent)
        .toContain('Time Zone Tracker')
    })

    it('has toolbar', () => {
      expect(fixture.nativeElement.querySelector('mat-toolbar')).toBeTruthy()
    })


    it('if not timezone is selected, the timezone card should not be present', () => {
      let timezoneComponent = fixture.debugElement.query(By.css('app-timezone'))?.componentInstance
      expect(timezoneComponent).toBeFalsy()
    })

    it('selecting a timezone should add a new timezone item for that timezone', fakeAsync(() => {
      selectTimezoneDropdown(fixture)
      selectTimezoneItem(fixture, 1)

      let timezoneComponent = fixture.debugElement.query(By.css('app-timezone')).componentInstance
      expect(timezoneComponent.timezone).toBe('CET')

      flush()
    }))

    it('uses TimezoneService to show user a list of timezone areas', fakeAsync(() => {
      selectTimezoneDropdown(fixture)
      const selectOptions = fixture.debugElement.queryAll(By.css('.mat-option-text'))

      expect(selectOptions.length).toEqual(2)
      expect(selectOptions[0].nativeElement.textContent).toContain('Australia/Sydney')
      expect(selectOptions[1].nativeElement.textContent).toContain('CET')

      flush()
    }))

    it('sets interval to refresh current time onInit', fakeAsync(() => {
      let refreshCount = 0
      app.ngOnInit()

      app.refreshTime$?.subscribe(() => {
        refreshCount += 1
      })

      tick(1000)
      expect(refreshCount).toEqual(1)
      discardPeriodicTasks()
    }))

    it('stops interval for refresh current time onDestroy', fakeAsync(() => {
      let refreshCount = 0

      app.refreshTime$?.subscribe(() => {
        refreshCount += 1
      })
      tick(1500)

      expect(refreshCount).toEqual(0)
      discardPeriodicTasks()
    }))

    it('unsubscribes when destroyed', () => {
      app.getLocationsSubscription = new Subscription()
      spyOn(app.getLocationsSubscription, 'unsubscribe')

      app.ngOnDestroy()

      expect(app.getLocationsSubscription.unsubscribe).toHaveBeenCalledTimes(1)
    })
  })

  describe('with failed TimezoneService', () => {

    describe('with specific error message', function () {

      beforeEach(waitForAsync(() => {
        setupTestBed({
          getLocations: () => of({error: "Failed to execute service"})
        })
      }))

      beforeEach(() => {
        fixture = TestBed.createComponent(TimezoneTrackerComponent)
        app = fixture.componentInstance
        fixture.detectChanges()
      })

      it('if timezone service returns an error, show that on the page', fakeAsync(() => {
        let errorMessageElement = fixture.nativeElement.querySelector('.error-message')
        expect(errorMessageElement.textContent).toEqual('Failed to execute service')

        flush()
      }))
    })

    describe('with timeout error', function () {

      beforeEach(waitForAsync(() => {
        setupTestBed({
          getLocations: () => of({error: undefined})
        })
      }))

      beforeEach(() => {
        fixture = TestBed.createComponent(TimezoneTrackerComponent)
        app = fixture.componentInstance
        app.refreshSubscription?.unsubscribe()
        fixture.detectChanges()
      })

      it('if timezone service returns an error, show that on the page', fakeAsync(() => {
        let errorMessageElement = fixture.nativeElement.querySelector('.error-message')
        expect(errorMessageElement.textContent).toEqual('Failed to retrieve timezones')

        flush()
      }))
    })
  })
})
