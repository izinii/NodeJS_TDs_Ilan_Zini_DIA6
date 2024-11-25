import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, Router} from '@angular/router';
import {UserSettingsService} from '../user-settings.service';
import {FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {LessonPackage} from '../app.component';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {NgIf} from '@angular/common';;

/*import {UserSettingsService} from "../user-settings.service";*/


/*class UserSettingsService {
  lastLessonId: number | undefined;
}*/

@Component({
  selector: 'app-lesson-edit-form',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgbTooltip,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './lesson-edit-form.component.html'
})
export class LessonEditFormComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private userSettingsService: UserSettingsService, private formBuilder: FormBuilder) {
    this.lessonForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: [''],
      level: [''],
      prerequisite: [''],
      tags: [''],
      copyright: ['']
    });
  }

  lessonForm: FormGroup;

  model: LessonPackage = {
    title: '',
    description: '',
    category: '',
    level: 1,
    prerequisite: [],
    tags: [],
    copyright: ''
  }

/*
title: string = '';
  description: string = '';
  category: string = '';
  level: number = 1;
  prerequisite: string[] = [];
  tags: string[] = [];
  copyright: string = '';
  */


  ngOnInit(): void {
    console.log("LessonListPageComponent.ngOnInit()");
    this.lessonForm = this.formBuilder.group({
      title: [this.model.title, Validators.required],
      description: [this.model.description, Validators.required],
      category: [this.model.category, Validators.required],
      level: [this.model.level, [Validators.required, Validators.min(1), Validators.max(10)]],
      prerequisite: [this.model.prerequisite],
      tags: [this.model.tags],
      copyright: [this.model.copyright, Validators.required]
    });
  }

  ngOnDestroy(): void {
    console.log("LessonListPageComponent.ngOnDestroy()");
  }


  onClickSubmit() {
    if (this.lessonForm.valid) {
      const formData = this.lessonForm.value;
      console.log('Form data submitted:', formData);
    } else {
      console.log('Form is invalid. Please check the required fields.');
    }
  }

}
