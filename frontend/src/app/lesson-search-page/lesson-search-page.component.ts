import {Component} from '@angular/core';
import {DatePickerRangePopupComponent} from '../date-picker-range-popup/date-picker-range-popup.component';

export interface LessonPackage {
  title: string;
  description: string;
  category: string;
  level: string;
  tags: string[];
  author: string;
  lastModifiedDate: string;
}

@Component({
  selector: 'app-lesson-search-page',
  standalone: true,
  imports: [DatePickerRangePopupComponent],
  templateUrl: './lesson-search-page.component.html',
  styleUrl: './lesson-search-page.component.css'
})
export class LessonSearchPageComponent {

}
