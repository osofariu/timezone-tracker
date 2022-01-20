# Time Zone Tracker

## Components

### TimezoneService
  get timezones
  get info for timezone

### TimeZoneTracker
  overall application
  wrap: title, list

### TimeZonePicker (top of screen)
  input: timeZone list object
  output: info for selected timezone
  have dropdown with list of timezones
  emit event that a new item is added?  may be easy enough to put in the top level

### TimeZoneList
  list of time zones added

### TimeZone
  track own location


## Priorities

* A - adding to list
* A - show timezone details for each time zone item
* A - poll the time (every minute, on 0 second or minute?) and update every timeZone item
* B - deleting from list
* B - color-code / use icons for each timezone based on time of day (gray at night, yellow in morning... etc.)
* B - persistence
* C - mark my own timezone
* C - use a separate store
