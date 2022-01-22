import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"

import {Observable} from 'rxjs'

@Injectable({providedIn: 'root'})
export class TimeZoneService {

  constructor(private httpClient: HttpClient) {}

  getLocations(): Observable<any> {
    return this.httpClient.get('https://worldtimeapi.org/api/timezone');
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
