import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-timezone',
  template: ''
})
export class TimeZoneComponent {
  @Input() timezone?: string;
}
