import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http";

import {from, Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TimeZoneService {

  constructor(private httpClient: HttpClient) {}

  getLocations(): Observable<string[]> {

    return of([
      "Australia/Broken_Hill",
      "Australia/Darwin",
      "Australia/Eucla",
      "Australia/Hobart",
      "Australia/Lindeman",
      "Australia/Lord_Howe",
      "Australia/Melbourne",
      "Australia/Perth",
      "Australia/Sydney",
      "CET",
      "CST6CDT",
      "EET",
      "EST",
      "EST5EDT",
      "Etc/GMT",
      "Etc/GMT+1",
      "Etc/GMT+10",
      "Etc/GMT+11",
      "Etc/GMT+12",
      "Etc/GMT+2",
      "Etc/GMT+3",
    ])
  }
}

// return of([
//   {area: 'America', location: [{name: 'Anchorage'}, {name: 'Detroit'}, {name: 'Argentina', region: 'Buenos_Aires'}]},
//   {area: 'Europe', location: [{name: 'Berlin'}, {name: 'Bucharest'}]},
//   {area: 'Asia', location: [{name: 'Tokyo'}, {name: 'Kuala_Lumpur', region: 'Buenos_Aires'}]},
//   {area: 'Africa', location: []}
// ])

// export type TimeZoneInfo = {
//   area: string,
//   location?: TimeZoneLocation[]
// }
//
// export type TimeZoneLocation = {
//   name: string,
//   region?: string
// }
