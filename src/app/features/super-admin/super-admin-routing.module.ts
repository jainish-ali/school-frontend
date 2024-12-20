import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./schools/schools.module").then(
        (m) => m.SchoolsModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("./manage-module/manage-module.module").then(
        (m) => m.ManageModuleModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
