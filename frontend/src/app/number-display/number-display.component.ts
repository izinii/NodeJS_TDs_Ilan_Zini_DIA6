import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-number-display',
  standalone: true,
  imports: [],
  //templateUrl: './number-display.component.html',
  styleUrl: './number-display.component.css',
  template: '<div> display value component: {{value}} </div>'
})
export class NumberDisplayComponent {

  @Input() value: number = 0;

}
