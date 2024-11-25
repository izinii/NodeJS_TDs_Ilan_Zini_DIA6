import { Routes } from '@angular/router';
import {LessonEditFormComponent} from './lesson-edit-form/lesson-edit-form.component';
import {LessonListPageComponent} from './lesson-list-page/lesson-list-page.component';
import {LessonSearchPageComponent} from './lesson-search-page/lesson-search-page.component';
import {LessonDetailPageComponent} from "./lesson-detail-page/lesson-detail-page.component";
import {TestPage1Component} from "./test-page1/test-page1.component";

export const routes: Routes = [
  {path: 'lesson-edit-form', component: LessonEditFormComponent},
  {path: 'lesson-list', component: LessonListPageComponent},
  {path: 'lesson-search', component: LessonSearchPageComponent},
  {path: 'lesson/:id', component: LessonDetailPageComponent},
  {path: 'test-page1', component: TestPage1Component}
];
