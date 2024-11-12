import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardWrapperComponent } from './wrapper/dashboard-wrapper/dashboard-wrapper.component';
import { DashboardContentComponent } from './pages/dashboard-content/dashboard-content.component';


@NgModule({
  declarations: [
    DashboardWrapperComponent,
    DashboardContentComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
