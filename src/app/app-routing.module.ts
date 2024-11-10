import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepoListComponent } from './features/shared/components/depo-list/depo-list.component';
import { HomePageComponent } from './features/shared/components/home-page/home-page.component';
import { SiteHeaderComponent } from './features/shared/layouts/components/site-header/site-header.component';
import { MainLayoutComponent } from './features/shared/layouts/main-layout/main-layout/main-layout.component';
import { LoginComponent } from './features/shared/user/login/login.component';
import { ManageUserComponent } from './features/shared/company/pages/manage-user/manage-user.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  
  },
  {
    path:"login",
    component: LoginComponent
  },
  
  {
    path: "admin",
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/admin/admin.module").then(
        (m) => m.AdminModule
      ),
  },
  {
    path: "inquiry",
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/inquiry/inquiry.module").then(
        (m) => m.InquiryModule
      ),
  },
  {
    path: "spare",
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/spare/spare.module").then(
        (m) => m.SpareModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
