import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageRolesComponent } from './components/manage-roles/manage-roles.component';
import { AddRoleComponent } from './components/add-roles/add-roles.component';

const routes: Routes = [
  {
    path: 'manage-role',
    component:ManageRolesComponent
  },
  {
    path: 'add-role',
    component:AddRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRolesRoutingModule { }
