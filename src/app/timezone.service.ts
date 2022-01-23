import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"

import {catchError, map, Observable, of, timeout} from 'rxjs'

@Injectable({providedIn: 'root'})
export class TimeZoneService {
  private  worldTimeUrl ='https://worldtimeapi.org/api/timezone'

  constructor(private httpClient: HttpClient) { }

  getLocations(): Observable<TimeZoneNames> {
    return this.httpClient.get(this.worldTimeUrl)
      .pipe(
        timeout(5000),
        map(response => ({results: response} as TimeZoneNames)),
        catchError(error => of({error: error.statusText}))
      )
  }
}

export type TimeZoneNames = {
  results?: string[]
  error?: string
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
