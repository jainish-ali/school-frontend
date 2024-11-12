import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContentComponent } from './pages/dashboard-content/dashboard-content.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
