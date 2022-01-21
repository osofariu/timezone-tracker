import {TestBed} from "@angular/core/testing";
import {TimeZoneService} from "./timezone.service";
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

describe('Timezone service', () => {

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

  it('gets a list of valid timezone, and organizes them hierarchically', done => {
    timezoneService.getLocations().subscribe(locations => {
      expect(locations.length).toEqual(21)
      done()
    })
  })

  // it('requests timezones from the world api service', () => {
  //   const req = httpTestingController.expectOne('http://localhost:8089/topics/1/courses');
  //
  //   expect(req.request.method).toEqual('POST');
  // })
})
