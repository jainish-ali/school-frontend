import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./inquiry-management/inquiry-management.module").then(
        (m) => m.InquiryManagementModule
      ),
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryRoutingModule { }
