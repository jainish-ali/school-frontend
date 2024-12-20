import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolWrapperComponent } from './wrapper/school-wrapper/school-wrapper.component';
import { AddSchoolComponent } from './pages/add-school/add-school.component';
import { LoginMasterComponent } from './pages/login-master/login-master.component';
import { LoginListComponent } from './pages/login-list/login-list.component';

const routes: Routes = [
  {
    path:"school-list",
    component:SchoolWrapperComponent
  },
  {
    path:"add-school",
    component:AddSchoolComponent
  },
  {
    path:"login-master",
    component:LoginMasterComponent
  },
  {
    path:"login-list",
    component:LoginListComponent
  },
  {
    path: 'add-school/:id',
    component:AddSchoolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
