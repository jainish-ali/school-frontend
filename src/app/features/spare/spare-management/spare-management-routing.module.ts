import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSpareComponent } from './pages/add-spare/add-spare.component';
import { SpareListComponent } from './pages/spare-list/spare-list.component';
import { SpareFormComponent } from './pages/spare-form/spare-form.component';

const routes: Routes = [
  {
    path:"add-spare",
    component:AddSpareComponent
  },
  {
    path:"spare-list",
    component:SpareListComponent
  },
  {
    path:"sale-spare",
    component:SpareFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpareManagementRoutingModule { }
