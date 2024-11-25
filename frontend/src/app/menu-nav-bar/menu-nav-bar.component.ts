import { Component } from '@angular/core';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu-nav-bar',
  standalone: true,
    imports: [
        NgbDropdown,
        NgbDropdownMenu,
        NgbDropdownToggle,
        RouterLink
    ],
  templateUrl: './menu-nav-bar.component.html',
  styleUrl: './menu-nav-bar.component.css'
})
export class MenuNavBarComponent {

}
