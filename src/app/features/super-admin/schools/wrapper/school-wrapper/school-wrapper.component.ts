import { Component } from '@angular/core';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';

@Component({
  selector: 'app-school-wrapper',
  templateUrl: './school-wrapper.component.html',
  styleUrls: ['./school-wrapper.component.scss']
})
export class SchoolWrapperComponent {
  breadcrumbItems: BreadcrumbItems = [
    {
      name: 'Home',
      path: '/',
      active: false,
    },

    {
      name: 'School List',
      path: '',
      active: true,
    },
  ];
}
