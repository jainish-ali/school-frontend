import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarModule } from "@solidexpert/ng-sidebar";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgSelectModule } from "@ng-select/ng-select";
import { TabsModule } from "ngx-bootstrap/tabs";
import { AlertModule } from "ngx-bootstrap/alert";
import { CarouselComponent, CarouselModule } from "ngx-owl-carousel-o";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TableModule } from "ngx-easy-table";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { NgxNavbarModule } from "ngx-bootstrap-navbar";
import { RouterModule } from "@angular/router";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PopoverModule } from "ngx-bootstrap/popover";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxSpinnerModule } from "ngx-spinner";
import { SiteHeaderComponent } from "./layouts/components/site-header/site-header.component";
import { SiteFooterComponent } from "./layouts/components/site-footer/site-footer.component";
import { SkyLogoComponent } from "./components/sky-logo/sky-logo.component";
import { MainLayoutComponent } from './layouts/main-layout/main-layout/main-layout.component';
import { SkyBrowserAlertComponent } from './components/sky-browser-alert/sky-browser-alert.component';
import { SkyHomeSearchComponent } from './components/sky-home-search/sky-home-search.component';
import { SkySearchControlComponent } from './components/sky-search-control/sky-search-control.component';
import { DashboardFeaturesComponent } from './components/dashboard-features/dashboard-features.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './user/login/login.component';
import { DepoListComponent } from './components/depo-list/depo-list.component';
import { CompanyRoutingModule } from "./company/company-routing.module";
import { SkyBreadcrumbComponent } from './components/sky-breadcrumb/sky-breadcrumb.component';
import { CompanyModule } from "./company/company.module";
import { SkyCustomCheckboxComponent } from './components/form-control-components/sky-custom-checkbox/sky-custom-checkbox.component';
import { SkyCustomRadioComponent } from './components/form-control-components/sky-custom-radio/sky-custom-radio.component';
import { SkyRadioButtonComponent } from './components/form-control-components/sky-radio-button/sky-radio-button.component';
import { SkySwitchButtonComponent } from './components/form-control-components/sky-switch-button/sky-switch-button.component';
import { CommentModalComponent } from './components/comment-modal/comment-modal.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SwitchTabModalComponent } from './components/switch-tab-modal/switch-tab-modal.component';
import { TableViewComponent } from './components/form-control-components/table-view/table-view.component';
import { AlertComponent } from "./components/alert/alert.component";
import { SiteSidenavComponent } from './layouts/components/site-sidenav/site-sidenav.component';
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    SkyLogoComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    MainLayoutComponent,
    SkyBrowserAlertComponent,
    SkyHomeSearchComponent,
    SkySearchControlComponent,
    DashboardFeaturesComponent,
    HomePageComponent,
    LoginComponent,
    DepoListComponent,
    SkyBreadcrumbComponent,
    SkyCustomCheckboxComponent,
    SkyCustomRadioComponent,
    SkyRadioButtonComponent,
    SkySwitchButtonComponent,
    CommentModalComponent,
    ConfirmationDialogComponent,
    ErrorModalComponent,
    LoaderComponent,
    SwitchTabModalComponent,
    TableViewComponent,
    AlertComponent,
    SiteSidenavComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SidebarModule,
    FontAwesomeModule,
    NgSelectModule,
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    CarouselModule,
    BsDatepickerModule.forRoot(),
    TableModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxNavbarModule,
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    SidebarModule,
    FontAwesomeModule,
    NgSelectModule,
    TabsModule,
    AlertModule,
    CarouselModule,
    BsDatepickerModule,
    TableModule,
    ModalModule,
    BsDropdownModule,
    NgxNavbarModule,
    CollapseModule,
    PaginationModule,
    TooltipModule,
    PopoverModule,
    AccordionModule,
    SkyLogoComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    SkyBrowserAlertComponent,
    SkyHomeSearchComponent,
    SkySearchControlComponent,
    DashboardFeaturesComponent,
    LoginComponent,
    DepoListComponent,CompanyRoutingModule,
    SkyBreadcrumbComponent,
    LoaderComponent,
    SkyCustomCheckboxComponent,
    TableViewComponent,
    AlertComponent,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
    
  ],
})
export class SharedModule { }
