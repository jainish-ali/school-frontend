import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
import { RolesService } from '../../service/roles.service';
import { ConfirmationDialogComponent } from 'src/app/features/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AddRoleComponent } from '../add-roles/add-roles.component';
import { SharedService } from 'src/app/features/http-services/shared.service';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss'],
})
export class ManageRolesComponent implements OnInit {
  breadcrumbItems: BreadcrumbItems = [
    {
      name: 'Home',
      path: '/',
      active: false,
    },
    {
      name: 'Role Master',
      path: '',
      active: true,
    },
  ];
  public columns!: Columns[];
  public configuration!: Config;
  spinnerLoading: boolean = false;
  allRoleData: any;
  totalRecords: number = 0;
  pageIndex: number = 1;
  tableItemsSize: number = 10;
  branches: any[] = [];
  alertType: string = 'success';
  alertTrigger: boolean = false;
  alertData: any = { message: 'Success' };
  data: any;

  startValue: number = this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
  lastValue: number = this.startValue + this.tableItemsSize - 1;
  BranchId : any;
  param = {
    searchBy: '',
    searchValue: '',
    status: '',
    sortby: '',
    sortCode: 'desc',
    page: 0,
    limit: 1000,
    BranchID:''
  };
  totlRecords: any;
  modalRef?: BsModalRef;
 
  
  constructor(
    private modalService: BsModalService,
    private roleService: RolesService,
    private sharedService : SharedService
  ) {}

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.checkboxes = false;
    this.configuration.tableLayout.striped = true;
    this.configuration.paginationRangeEnabled = false;
    this.configuration.paginationEnabled = false;
    this.columns = [
      //{ key: 'RoleID', title: 'Role ID', width: '10%' },
      { key: 'RoleName', title: 'Role Name', width: '30%' },
      { key: 'BranchID', title: 'Branch ID', width: '30%' },
      { key: 'Actions', title: 'Actions', width: '10%' },
    ];
    this.sharedService.getBranchID().subscribe(branchID => {
     this.BranchId=branchID;
     this.param.searchBy = "BranchID";
     this.param.searchValue = this.BranchId 
     this.param.BranchID = this.BranchId;
     this.getRoles();  
     
   });
  
  }

  getRoles(): void {
    this.spinnerLoading = true;
    this.totlRecords = 0;
    this.allRoleData = [...[], ...[]];
    
    this.roleService.role(this.param).subscribe({
      next: (res: any) => {
        this.allRoleData = res?.result?.data || [];

        this.totalRecords = res?.pagination?.totalResults || 0;
        this.spinnerLoading = false;
      },
      error: () => {
        this.spinnerLoading = false;
      },
    });
  }

  onSearchRoles(event: any): void {
    this.param.searchBy = "RoleName";
    this.param.searchValue = event.target.value;
    this.getRoles();
  }

  onBranchChange(event: any): void {
   // this.param.branchId = event || '';
    this.getRoles();
  }

  onTablePageChange(event: number): void {
    this.pageIndex = event;
    this.param.page = event - 1;
    this.getRoles();
  }

  deleteRole(roleID: number, roleName: string): void {

    this.openConfirmationModal({
      title: "Remove" + " - " + roleName,
      content: "Do you really want to remove this user?",
      primaryActionLabel: "YES",
      secondaryActionLabel: "NO",
      onPrimaryAction: () => this.remove(roleID),
    });
  }
  remove(id: any) {
    this.roleService.deleteRole(id).subscribe((res: any) => {
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
       this.getRoles();
      }
    });
  }
  stopAlert() {
    this.spinnerLoading = false;
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
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
  openCreateRoleModal(): void {
    const initialState: ModalOptions = {
      initialState: {
        BranchId:this.BranchId
      },

    };
    this.modalRef = this.modalService.show(
      AddRoleComponent,
      Object.assign(initialState, {
        id: 'confirmation',
        class: 'modal-md modal-dialog-centered',
      })
    );
    this.modalRef.content.messageEvent.subscribe((data: any) => {
    this.getRoles()
      
    })
  }
  openUpdateModal(RoleId: any, RoleName:any): void {
    const initialState: ModalOptions = {
      initialState: {
        BranchId:this.BranchId,
        RoleId:RoleId,
        RoleName:RoleName,
        buttonName:"Update Role"
      },

    };
    this.modalRef = this.modalService.show(
      AddRoleComponent,
      Object.assign(initialState, {
        id: 'confirmation',
        class: 'modal-md modal-dialog-centered',
      })
    );
    this.modalRef.content.messageEvent.subscribe((data: any) => {
    this.getRoles()
      
    })
  }
}
