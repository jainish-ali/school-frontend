import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageLoginRoutingModule } from './manage-login-routing.module';
import { LoginListComponent } from './components/login-list/login-list.component';
import { LoginMasterComponent } from './components/login-master/login-master.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    LoginListComponent,
    LoginMasterComponent
  ],
  imports: [
    CommonModule,
    ManageLoginRoutingModule,
    SharedModule
]
})
export class ManageLoginModule { }
