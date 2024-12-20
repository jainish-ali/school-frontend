import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddModuleComponent } from './pages/add-module/add-module.component';
import { ModuleListComponent } from './pages/module-list/module-list.component';
import { ModuleMasterListComponent } from './pages/module-master-list/module-master-list.component';
import { AddModuleMasterComponent } from './pages/add-module-master/add-module-master.component';

const routes: Routes = [
  {
    path: 'add-module',
    component: AddModuleComponent,
  },
  {
    path: 'add-module/:id',
    component: AddModuleComponent,
  },
  {
    path: 'module-list',
    component: ModuleListComponent,
  },
  {
    path: 'module-master-list',
    component: ModuleMasterListComponent,
  },
  {
    path: 'add-module-master',
    component: AddModuleMasterComponent,
  },
  {
    path: 'add-module-master/:id',
    component:AddModuleMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageModuleRoutingModule {}
