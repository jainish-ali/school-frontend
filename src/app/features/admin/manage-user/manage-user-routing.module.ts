import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUsrComponent } from './pages/create-usr/create-usr.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { StatusComponent } from './pages/status/status.component';
import { UserTypeComponent } from './pages/user-type/user-type.component';
import { InquiryTypeComponent } from './pages/inquiry-type/inquiry-type.component';

const routes: Routes = [
  {
   path:'createuser',
   component: CreateUsrComponent
  },
  {
    path:'users',
    component:UserListComponent
  },
  {
    path:'status',
    component:StatusComponent
  },
  {
    path:'userType',
    component:UserTypeComponent
  },
  {
    path:'InquiryType',
    component:InquiryTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
