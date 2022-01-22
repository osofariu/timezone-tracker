import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html'
})
export class TimeZoneComponent {
  @Input() timezone?: string;
}
