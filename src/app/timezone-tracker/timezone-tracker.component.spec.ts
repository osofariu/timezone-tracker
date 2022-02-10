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
import {By} from "@angular/platform-browser"
import {of, Subscription} from "rxjs"
import {MatListModule} from "@angular/material/list"
import {MatAutocompleteModule} from "@angular/material/autocomplete"
import {MatInputModule} from "@angular/material/input"
import {TimezoneSelectorComponent} from "../timezone-selector/timezone-selector.component"
import {MockComponent} from "ng-mocks"
import {TimezoneItemComponent} from "../timezone-item/timezone-item.component"

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
        MatAutocompleteModule,
        MatInputModule
      ],
      declarations: [
        TimezoneTrackerComponent,
        MockComponent(TimezoneSelectorComponent),
        MockComponent(TimezoneItemComponent)
      ],
      providers: [
        {provide: TimezoneService, useValue: timezoneServiceStub}
      ]
    }).compileComponents()
  }

  describe('with successful timezone service', function () {
    const expectedTimezones = ["Australia/Sydney", "CET"]
    beforeEach(waitForAsync(() => {
      setupTestBed({
        getLocations: () => of({results: expectedTimezones})
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

    it('if no timezone is selected, the timezone card should not be present', () => {
      let timezoneComponent = fixture.debugElement.query(By.css('app-timezone'))?.componentInstance
      expect(timezoneComponent).toBeFalsy()
    })

    it('if timezones are selected, the timezone item components get rendered for those timezones', () => {
      app.selectedTimezones = ['AAA/BBB', 'CCC/DDD']
      fixture.detectChanges()

      let timezoneItemComponents = fixture.debugElement.queryAll(By.css('app-timezone'))
      expect(timezoneItemComponents.length).toBe(2)
      expect(timezoneItemComponents[0].componentInstance.timezone).toEqual('AAA/BBB')
      expect(timezoneItemComponents[1].componentInstance.timezone).toEqual('CCC/DDD')
    })

    it('selecting a timezone through TimezoneSelectorComponent should call onSelectedTimezone', fakeAsync(() => {
      const emitTimezoneSpy = spyOn(app, 'onSelectedTimezone')

      const timezoneSelector = fixture.debugElement.query(By.directive(TimezoneSelectorComponent)).componentInstance
      timezoneSelector.selectedTimezone?.emit('AA/BB')
      fixture.detectChanges()

      expect(emitTimezoneSpy).toHaveBeenCalledOnceWith('AA/BB')
    }))

    it('selecting a timezone through TimezoneSelectorComponent should add a new timezone item for that timezone', fakeAsync(() => {
      const timezoneSelector = fixture.debugElement.query(By.directive(TimezoneSelectorComponent)).componentInstance
      timezoneSelector.selectedTimezone?.emit('AA/BB')
      fixture.detectChanges()

      expect(app.selectedTimezones).toContain('AA/BB')
    }))

    it('selecting a timezone through TimezoneSelectorComponent and removing it should make it disappear from the list', fakeAsync(() => {
      let aTimezone = 'AA/BB'
      app.selectedTimezones = [ aTimezone ]
      fixture.detectChanges()

      const timezoneItemAdded = fixture.debugElement.query(By.directive(TimezoneItemComponent)).componentInstance
      timezoneItemAdded.remove$.emit(aTimezone)
      fixture.detectChanges()

      expect(app.selectedTimezones).not.toContain(aTimezone)
    }))

    it('passes the available timezones to TimezoneSelectorComponent', () => {
      const timezoneSelector = fixture.debugElement.query(By.directive(TimezoneSelectorComponent)).componentInstance
      fixture.detectChanges()

      expect(timezoneSelector.availableTimezones).toEqual(expectedTimezones)
    })

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
