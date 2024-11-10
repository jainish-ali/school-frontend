import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpareManagementRoutingModule } from './spare-management-routing.module';
import { AddSpareComponent } from './pages/add-spare/add-spare.component';
import { SpareDetailComponent } from './pages/spare-detail/spare-detail.component';
import { SpareListComponent } from './pages/spare-list/spare-list.component';
import { SpareFormComponent } from './pages/spare-form/spare-form.component';


@NgModule({
  declarations: [
    AddSpareComponent,
    SpareDetailComponent,
    SpareListComponent,
    SpareFormComponent
  ],
  imports: [
    CommonModule,
    SpareManagementRoutingModule
  ]
})
export class SpareManagementModule { }
