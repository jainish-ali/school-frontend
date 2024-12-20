import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ConfirmationDialogComponent } from 'src/app/features/shared/components/confirmation-dialog/confirmation-dialog.component';
//import { limit, ModuleSearchBy, moduleStatus } from 'src/app/features/shared/constant/company';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-module-master-list',
  templateUrl: './module-master-list.component.html',
  styleUrls: ['./module-master-list.component.scss'],
})
export class ModuleMasterListComponent {
  breadcrumbItems: BreadcrumbItems = [
    {
      name: 'Home',
      path: '/',
      active: false,
    },
    {
      name: 'Module Master List',
      path: '',
      active: true,
    },
  ];

  public columns!: Columns[];
  public configuration!: Config;
  spinnerLoading: boolean = false;
  moduleList: any;
  totlRecords: any;
  allModuleData: any;
  tableLoading: boolean = false;
  alertType: string = 'success';
  alertTrigger: boolean = false;
  alertData: any = {
    message: 'Success',
  };

  modalRef?: BsModalRef;

  data: any[] = [];
  pageIndex: number = 1;
  tableItemsSize: number = 10;
  startValue: number = this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
  lastValue: number = this.startValue + this.tableItemsSize - 1;

  param = {
    searchBy: '',
    searchValue: '',
    status: '',
    sortby: '',
    sortCode: 'desc',
    page: 0,
    limit: 10,
  };

  constructor(
    private moduleMasterService: ModuleService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.checkboxes = false;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.hover = false;
    this.configuration.paginationRangeEnabled = false;
    this.configuration.paginationEnabled = false;

    this.columns = [
      { key: 'ModuleID', title: 'Module ID', width: '10%' },
      { key: 'ModuleName', title: 'Module Name', width: '20%' },
      { key: 'Sort', title: 'Sort Order', width: '10%' },
      { key: 'Status', title: 'Status', width: '10%' },
      { key: 'CreatedOn', title: 'Created On', width: '15%' },
      { key: 'CreatedBy', title: 'Created By', width: '10%' },
      { key: 'ModifiedOn', title: 'Modified On', width: '15%' },
      { key: 'ModifiedBy', title: 'Modified By', width: '10%' },
      { key: 'delete', title: 'Action', width: '10%' },
    ];

    this.getModuleList({});
  }

  getModuleList(event: any) {
    this.spinnerLoading = true;
    this.totlRecords = 0;
    this.allModuleData = [];

    this.moduleMasterService.moduleMaster(this.param).subscribe({
      next: (res: any) => {
        this.allModuleData = res?.result?.data;
        this.totlRecords = this.allModuleData.pagination?.totalResults || 0;
        this.stopAlert();
      },
      error: (err: any) => {
        this.tableLoading = false;
      },
    });
  }

  onTableDataChange(event: any) {
    this.pageIndex = event;
    this.startValue = this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
    this.lastValue = this.startValue + this.tableItemsSize - 1;
    this.lastValue = this.lastValue > this.data.length ? this.data.length : this.lastValue;
  }

  onTablePageChange(event: any) {
    this.param.page = event - 1;
    this.pageIndex = event;
    this.getModuleList(event - 1);
  }

  onSearchBY(event: any): void {
    this.param.searchBy = event == undefined ? '' : event;
  }

  onSearchModules(inputValue: any): void {
    this.param.searchValue = inputValue.target.value == undefined ? '' : inputValue.target.value;
    this.param.searchBy = "ModuleName"
    this.getModuleList(this.param);
  }

  onStatusChange(event: any): void {
    this.param.status = event == undefined ? '' : event;
    this.getModuleList(0);
  }

  stopAlert() {
    this.spinnerLoading = false;
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  deleteModule(id: any, name: any) {
    this.openConfirmationModal({
      title: 'Remove Module - ' + name,
      content: 'Do you really want to remove this module?',
      primaryActionLabel: 'YES',
      secondaryActionLabel: 'NO',
      onPrimaryAction: () => this.remove(id),
    });
  }

  remove(id: any) {
    this.moduleMasterService.deleteModuleMaster(id).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.message === 'Success') {
        this.alertData = {
          message: 'Module removed successfully',
        };
        this.alertType = 'success';
        this.alertTrigger = true;
        this.stopAlert();
        this.getModuleList({});
      }
    });
  }

  openConfirmationModal(data = {}) {
    const initialState: ModalOptions = {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: { ...data },
    };
    this.modalRef = this.modalService.show(
      ConfirmationDialogComponent,
      Object.assign(initialState, {
        id: 'confirmation',
        class: 'modal-md modal-dialog-centered',
      })
    );
  }

  getClass(status: any) {
 
    switch (status) {
      case true:
        return 'bi bi-check-circle-fill text-success';
      case false:
        return 'bi bi-x-circle-fill text-danger';
      default:
        return 'bi bi-x-circle-fill text-danger';
    }
  }
  navigateToAdd(id: string | number) {
    this.router.navigate([`superadmin/add-module-master`, id]);
  }
}
