import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./manage-roles/manage-roles.module").then(
        (m) => m.ManageRolesModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("./manage-login/manage-login.module").then(
        (m) => m.ManageLoginModule
      ),
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
