import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginMasterComponent } from './components/login-master/login-master.component';

const routes: Routes = [
  {
    path:'login-master',
    component: LoginMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageLoginRoutingModule { }
