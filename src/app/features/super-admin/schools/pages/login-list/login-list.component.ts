import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { SchoolService } from '../../services/school.service';
import { ConfirmationDialogComponent } from 'src/app/features/shared/components/confirmation-dialog/confirmation-dialog.component';
import { limit, LoginsearchBy, loginstatus } from 'src/app/features/shared/constant/company';
import { Router } from '@angular/router';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
@Component({
  selector: 'app-login-list',
  templateUrl: './login-list.component.html',
  styleUrls: ['./login-list.component.scss']
})
export class LoginListComponent {
  breadcrumbItems: BreadcrumbItems = [
    {
      name: 'Home',
      path: '/',
      active: false,
    },

    {
      name: 'Login Master',
      path: '',
      active: true,
    },
  ];
  searchBy = LoginsearchBy;
  status = loginstatus;
  limit = limit;
  public columns!: Columns[];
  public configuration!: Config;
  spinnerLoading: boolean = false;
  schoolList: any;
  totlRecords: any;
  allloginData: any;
  tableLoading: boolean = false;
  alertType: string = "success";
  alertTrigger: boolean = false;
  alertData: any = {
    message: "success",
  };
  
  modalRef?: BsModalRef;
  
  constructor(
    private schoolService: SchoolService,
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
      { key: 'LoginID', title: 'Login', width: '10%' }, // Updated to match SchoolName column
      { key: 'Password', title: 'Password', width: '5%' },
      { key: 'LoginName', title: 'Name', width: '5%' },
      { key: 'MobileNumber', title: 'Mobile', width: '5%' },
      { key: 'EmailId', title: 'Email', width: '5%' },
      { key: 'RoleID', title: 'Role',  },
      { key: 'BranchID', title: 'Branch', },
      { key: 'StatusID', title: 'Status',  },
      { key: 'CreatedOn', title: 'Created', width: '15%' },
      { key: 'CreatedBy', title: 'Created By', width: '15%' },
      { key: 'ModifiedOn', title: 'changes On', width: '15%' },
      { key: 'ModifiedBy', title: 'changes By', width: '15%' },
      { key: 'delete', title: 'Action', width: '5%' }, // Action column for delete
    ];
    

    this.getloginList({})
  }
  getloginList(event: any) {
    this.spinnerLoading = true;
    this.totlRecords = 0;
    this.allloginData = [...[], ...[]];
    
    this.tableLoading = true;
    this.schoolService
      .existlist(
        this.param
      )
      .subscribe({
        next: (res : any) => {
          this.allloginData = res?.result?.data
          console.log(this.allloginData)
          this.totlRecords = this.allloginData.pagination?.totalResults || 0;
         this.stopAlert()
        },
        error:
          (err: any) => {
            this.tableLoading = false;
          }

      });
  }
  data: any[] = [];
  pageIndex: number = 1;
  tableItemsSize: number = 10;
  startValue: number = this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
  lastValue: number = this.startValue + this.tableItemsSize - 1;
  
  onTableDataChange(event: any) {
    this.pageIndex = event;
    this.startValue = this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
    this.lastValue = this.startValue + this.tableItemsSize - 1;
    this.lastValue = this.lastValue > this.data.length ? this.data.length : this.lastValue;
  }
  
  param = {
    searchBy: '',
    searchValue: '',
    status: '',
    sortby: '',
    sortCode: 'desc',
    page: 0,
    limit: 10,
  };
  
  onTablePageChange(event: any) {
    this.param.page = event - 1;
    this.pageIndex = event;
    this.getloginList(event - 1);
  }
  
  onSearchBY(event: any): void {
    this.param.searchBy = event == undefined ? '' : event;
  }
  
  onSearchSchools(inputValue: any): void {
    this.param.searchValue = inputValue.target.value == undefined ? '' : inputValue.target.value;
    this.getloginList(this.param);
  }
  
  onStatusChange(event: any): void {
    console.log(event);
    
    this.param.status = event == undefined ? '' : event;
    this.getloginList(0);
  }
  
  stopAlert() {
    this.spinnerLoading = false;
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }
  
  deletelogin(id: any, name: any,role: any) {
    if(role.trim() === "SuperAdmin"){
      this.openConfirmationModal({
        title: "Remove" + " - " + name,
        content: "You Can not delete Super Admin",
        primaryActionLabel: "OK",
      });  
      return;
    }
    this.openConfirmationModal({
      title: "Remove" + " - " + name,
      content: "Do you really want to remove this school?",
      primaryActionLabel: "YES",
      secondaryActionLabel: "NO",
      onPrimaryAction: () => this.remove(id),
    });
  }
  
  remove(id: any) {
    this.schoolService.deletelogin(id).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      if (res?.body?.message === 'Success') {
        this.alertData = {
          message: "Login removed successfully",
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
       this.getloginList({});
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
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
  }
  navigateToAddSchool(schoolID: string | number) {
    this.router.navigate([`superadmin/add-school`, schoolID]);
  }
  getClass(status: string): string {
    switch (parseFloat(status)) {
      case 1:
        return 'bi bi-check-circle-fill text-success';
      case 2:
        return 'bi bi-x-circle-fill text-danger';
      default:
        return 'bi bi-x-circle-fill text-danger';
    }
  }
}
