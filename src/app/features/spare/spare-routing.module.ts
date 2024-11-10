import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./spare-management/spare-management.module").then(
        (m) => m.SpareManagementModule
      ),
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpareRoutingModule { }
