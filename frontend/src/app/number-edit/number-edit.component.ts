import {Component, Input, Output} from '@angular/core';
import {Subject} from "rxjs";
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-number-edit',
  standalone: true,
  imports: [
    FormsModule
  ],
  //templateUrl: './number-edit.component.html',
  styleUrl: './number-edit.component.css',
  template: '<input [(ngModel)]="value" (ngModelChange)="onInputChange()">'
})

export class NumberEditComponent {

  @Input() value: number = 0;
  @Output() valueChange = new Subject<number>();

  onInputChange() {
    this.valueChange.next(this.value);
  }

}
