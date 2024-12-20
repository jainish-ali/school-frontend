import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRolesRoutingModule } from './manage-roles-routing.module';
import { ManageRolesComponent } from './components/manage-roles/manage-roles.component';
import { AddRoleComponent } from './components/add-roles/add-roles.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    ManageRolesComponent,
    AddRoleComponent
  ],
  imports: [
    CommonModule,
    ManageRolesRoutingModule,
    SharedModule
]
})
export class ManageRolesModule { }
