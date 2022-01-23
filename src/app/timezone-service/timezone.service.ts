import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"

import {catchError, map, Observable, of, timeout} from 'rxjs'

@Injectable({providedIn: 'root'})
export class TimezoneService {
  private  worldTimeUrl ='https://worldtimeapi.org/api/timezone'

  constructor(private httpClient: HttpClient) { }

  getLocations(): Observable<TimezoneNames> {
    return this.httpClient.get(this.worldTimeUrl)
      .pipe(
        timeout(5000),
        map(response => ({results: response} as TimezoneNames)),
        catchError(error => of({error: error.statusText}))
      )
  }
}

export type TimezoneNames = {
  results?: string[]
  error?: string
}
