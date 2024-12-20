import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageModuleRoutingModule } from './manage-module-routing.module';
import { ModuleListComponent } from './pages/module-list/module-list.component';
import { AddModuleComponent } from './pages/add-module/add-module.component';
import { SharedModule } from "../../shared/shared.module";
import { ModuleMasterListComponent } from './pages/module-master-list/module-master-list.component';
import { AddModuleMasterComponent } from './pages/add-module-master/add-module-master.component';


@NgModule({
  declarations: [
    ModuleListComponent,
    AddModuleComponent,
    ModuleMasterListComponent,
    AddModuleMasterComponent
  ],
  imports: [
    CommonModule,
    ManageModuleRoutingModule,
    SharedModule
]
})
export class ManageModuleModule { }
