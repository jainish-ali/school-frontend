import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiryManagementRoutingModule } from './inquiry-management-routing.module';
import { InquiryComponent } from './pages/inquiry/inquiry.component';
import { InquiryListComponent } from './pages/inquiry-list/inquiry-list.component';
import { SharedModule } from '../../shared/shared.module';
import { FollowUpComponent } from './pages/follow-up/follow-up.component';


@NgModule({
  declarations: [
    InquiryComponent,
    InquiryListComponent,
    FollowUpComponent
  ],
  imports: [
    CommonModule,
    InquiryManagementRoutingModule,
    SharedModule
  ]
})
export class InquiryManagementModule { }
