import {Injectable} from "@angular/core"

@Injectable({providedIn: 'root'})
export class TimeZoneService {
  getLocations(): TzLocation[] {
    return [
      {area: 'America', location: 'EST'},
      {area: 'Europe', location: 'GMS'},
      {area: 'Asia', location: 'IST'}
    ]
  }
}

export type TzLocation = {
  area: string,
  location: string,
  region?: string
}
