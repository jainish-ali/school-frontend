import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
import { RolesService } from '../../service/roles.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/features/http-services/shared.service';

@Component({
  selector: 'add-role',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRoleComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  buttonName : any;
  BranchIds: any

  param = {
    searchBy: 'BranchId',
    searchValue: '',
    status: '',
    sortby: '',
    sortCode: 'desc',
    page: 0,
    limit: 10,
  };
  addRoleForm!: FormGroup;
  spinnerLoading: boolean = false;
  payload: any;
  RoleId: any;
  RoleName: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private roleService:RolesService,
    private modalService : BsModalService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.initForm();
    const branch = this.modalService.config.initialState;
    this.BranchIds = branch?.['BranchId'];
    this.RoleId = branch?.['RoleId'],
    this.RoleName= branch?.['RoleName'],
    this.buttonName = (branch?.['buttonName'] as string) || 'Add Role';
    if (this.RoleId) {
      this.param.searchValue = this.RoleId;
      this.loadRole(this.RoleId);
    }
  }

  initForm(): void {
    this.addRoleForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]], // Letters and spaces only
    });
  }

   submit(formValue: any){
    if (!formValue) return;
       this.payload = {
        RoleName: formValue.roleName,
        BranchID: this.BranchIds,
      };

    if (this.buttonName === 'Update Role') {
      this.roleService.updateRole(this.param.searchValue,this.payload).subscribe((res: any) => {
        this.addRoleForm.reset();
        this.cancel()
        this.showAlert('Role updated successfully');
        this.messageEvent.emit("true");
      });
    } else {  
      this.roleService.createrole(this.payload).subscribe((res: any) => {
        this.addRoleForm.reset();
        this.cancel()
        this.showAlert('Role added successfully');
        this.messageEvent.emit("true");
      });
    }
  }

  loadRole(roleId: string): void {
    this.spinnerLoading = true;
    this.param.searchBy ='RoleID'
    this.param.searchValue = roleId
    this.roleService.role(this.param).subscribe({
      next: (res: any) => {
        const roleData = res?.result?.data;
        if (roleData) {
          this.addRoleForm.patchValue({
            roleName: roleData?.data[0]?.RoleName?.trim(),
          });
          this.buttonName = 'Update Role';
        }
        this.spinnerLoading = false;
      },
      error: () => {
        this.spinnerLoading = false;
      },
    });
  }

  showAlert(message: string): void {
    this.notificationService.successAlert(message, 'Yes, go to Role List').subscribe((result) => {
      if (result.confirmed) {
        this.modalService.hide();
      }
    });
  }

  cancel(): void {
    this.modalService.hide();
  }
}
