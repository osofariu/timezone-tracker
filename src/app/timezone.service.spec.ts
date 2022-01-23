import {TestBed} from "@angular/core/testing"
import {TimeZoneService} from "./timezone.service"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('TimeZone Service', () => {

  let timezoneService: TimeZoneService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimeZoneService]
    });
    timezoneService = TestBed.inject(TimeZoneService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('requests timezones from the world api service', () => {
    const expectedBody = ["first", "second"]
    timezoneService.getLocations().subscribe((locations) => {
      expect(locations.results).toBe(expectedBody)
    })

    const req = httpTestingController.expectOne('https://worldtimeapi.org/api/timezone');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedBody)
  })

  it('returns an error if the HTTP request failed', () => {
    timezoneService.getLocations().subscribe((locations) => {
      expect(locations.results).toBe(undefined)
      expect(locations.error).toEqual('Not Found')
    })
    const testRequest = httpTestingController.expectOne("https://worldtimeapi.org/api/timezone");
    testRequest.flush('404 error', { status: 404, statusText: 'Not Found' });
  })
})
