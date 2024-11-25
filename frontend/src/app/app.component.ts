import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LessonEditFormComponent} from "./lesson-edit-form/lesson-edit-form.component";
import {LessonSearchPageComponent} from "./lesson-search-page/lesson-search-page.component";
import {MenuNavBarComponent} from "./menu-nav-bar/menu-nav-bar.component";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';


export interface LessonPackage {
  title: string;
  description: string;
  category: string;
  level: number;
  prerequisite: string[];
  tags: string[];
  copyright: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LessonEditFormComponent, LessonSearchPageComponent, MenuNavBarComponent, RouterLink, NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';

  constructor() {
    console.log('AppComponent.constructor');
  }

  ngOnInit(): void {
    console.log('AppComponent.ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('AppComponent.ngOnDestroy');
  }
}
