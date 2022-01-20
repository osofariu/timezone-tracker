import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {TimeZoneTrackerComponent} from "./timezone-tracker.component";

describe('Time Zone Tracker', () => {
  let fixture: ComponentFixture<TimeZoneTrackerComponent>;
  let app: TimeZoneTrackerComponent;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        TimeZoneTrackerComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeZoneTrackerComponent);
    app = fixture.componentInstance;
  });

  it('has title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid=app-title]')?.textContent).toContain('Time Zone Tracker');
  });
})
