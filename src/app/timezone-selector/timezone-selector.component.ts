import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core"
import {FormControl} from "@angular/forms"
import {map, Observable, startWith} from "rxjs"
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete"

@Component({
  selector: 'timezone-selector',
  templateUrl: './timezone-selector.component.html'
})
export class TimezoneSelectorComponent implements OnInit {
  @Input() availableTimezones: string[] = []
  @Output() selectedTimezone = new EventEmitter<string>();
  myControl = new FormControl();
  filteredTimezones?: Observable<string[]>;

  selectionChange(timezoneSelected: MatAutocompleteSelectedEvent) {
    this.selectedTimezone.emit(timezoneSelected.option.value)
  }

  private _filter(value: string): string[]  {
    if (value == null) {
      return this.availableTimezones
    }
    return this.availableTimezones
      .filter(option => option.toLowerCase().includes(value.toLocaleLowerCase()));
  }

  ngOnInit(): void {
    this.filteredTimezones = this.myControl.valueChanges.pipe(
      map(value => this._filter(value)),
    );
  }
}
