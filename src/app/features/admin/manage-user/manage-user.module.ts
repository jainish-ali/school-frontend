import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CreateUsrComponent } from './pages/create-usr/create-usr.component';
import { StatusComponent } from './pages/status/status.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserTypeComponent } from './pages/user-type/user-type.component';
import { SharedModule } from '../../shared/shared.module';
import { InquiryTypeComponent } from './pages/inquiry-type/inquiry-type.component';


@NgModule({
  declarations: [
    HomeComponent,
    CreateUsrComponent,
    StatusComponent,
    UserListComponent,
    UserTypeComponent,
    InquiryTypeComponent
  ],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    SharedModule
  ]
})
export class ManageUserModule { }
