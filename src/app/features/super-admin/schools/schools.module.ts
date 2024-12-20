import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsRoutingModule } from './schools-routing.module';
import { SchoolListComponent } from './pages/school-list/school-list.component';
import { AddSchoolComponent } from './pages/add-school/add-school.component';
import { SchoolWrapperComponent } from './wrapper/school-wrapper/school-wrapper.component';
import { SharedModule } from "../../shared/shared.module";
import { LoginMasterComponent } from './pages/login-master/login-master.component';
import { LoginListComponent } from './pages/login-list/login-list.component';


@NgModule({
  declarations: [
    SchoolListComponent,
    AddSchoolComponent,
    SchoolWrapperComponent,
    LoginMasterComponent,
    LoginListComponent
  ],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    SharedModule
]
})
export class SchoolsModule { }
