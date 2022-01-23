import {AfterViewInit, Component, EventEmitter, Input, Output} from "@angular/core"

@Component({
  selector: 'timezone-selector',
  templateUrl: './timezone-selector.component.html'
})
export class TimezoneSelectorComponent implements AfterViewInit{
  @Input() availableTimezones?: string[] = []
  @Output() selectedTimezone = new EventEmitter<string>();
  selectedLocation?: string

  ngAfterViewInit() {
    console.log('view init ', this.availableTimezones)
  }

  selectionChange(timezoneName: string) {
    this.selectedTimezone.emit(timezoneName)
  }
}
