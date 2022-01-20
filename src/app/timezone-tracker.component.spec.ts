import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {TimeZoneTrackerComponent} from "./timezone-tracker.component";
import {MatToolbarModule} from "@angular/material/toolbar";

describe('Time Zone Tracker', () => {
  let fixture: ComponentFixture<TimeZoneTrackerComponent>;
  let app: TimeZoneTrackerComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatToolbarModule],
      declarations: [
        TimeZoneTrackerComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeZoneTrackerComponent);
    app = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('has title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar [data-testid=app-title]')?.textContent).toContain('Time Zone Tracker');
  });

  it('has toolbar', () => {
    expect(fixture.nativeElement.querySelector('mat-toolbar')).toBeTruthy();
  });

  it('has dropdown for timezones', () => {
    expect(fixture.nativeElement.querySelector('mat-toolbar mat-select')).toBeTruthy();
  });
});
