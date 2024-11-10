import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiryComponent } from './pages/inquiry/inquiry.component';
import { InquiryListComponent } from './pages/inquiry-list/inquiry-list.component';
import { FollowUpComponent } from './pages/follow-up/follow-up.component';

const routes: Routes = [
  {
    path:'inquiryform',
    component:InquiryComponent
  },
  {
    path:'inquirylist',
    component:InquiryListComponent
  },
  {
    path:'follow-up',
    component:FollowUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryManagementRoutingModule { }
