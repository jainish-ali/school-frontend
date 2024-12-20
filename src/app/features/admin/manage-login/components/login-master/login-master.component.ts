import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';

import { StorageService } from 'src/app/features/http-services/storage.service';
import { SchoolService } from 'src/app/features/super-admin/schools/services/school.service';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { take } from 'rxjs';
import { ModuleService } from 'src/app/features/super-admin/manage-module/services/module.service';

@Component({
  selector: 'app-login-master',
  templateUrl: './login-master.component.html',
  styleUrls: ['./login-master.component.scss'],
})
export class LoginMasterComponent {
  addUserForm!: FormGroup;
  spinnerLoading: any;
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
  roles = [];
  buttonName: string = 'Add User';
  username: any;
  mobileNumbers: any;
  data: any;
  allSchoolData: any;
  BranchId: any;
  allModuleData: any;
  ModuleNameData: any;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private schoolService: SchoolService,
    public storageService : StorageService,
    private sharedService : SharedService,
    private moduleService :ModuleService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getBranchList()
    this.getModuleList()
   this.getRole();
    this.addUserForm.get('loginIdSource')?.valueChanges.subscribe((value) => {
      this.updateLoginId(value);
    });
    this.addUserForm.get('mobileNumber')?.valueChanges.subscribe((value) => {
      if (this.addUserForm.get('loginIdSource')?.value === 'mobile') {
        this.addUserForm.get('loginId')?.setValue(value);
      }
    });

    this.addUserForm.get('emailID')?.valueChanges.subscribe((value) => {
      if (this.addUserForm.get('loginIdSource')?.value === 'email') {
        this.addUserForm.get('loginId')?.setValue(value);
      }
    });
    this.storageService.getItem("userDetail").subscribe((res: any) => {
      this.username = res.loginName      
     });
  }

  initializeForm(): void {
    this.addUserForm = this.fb.group({
      MobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      EmailID: ['', [Validators.required, Validators.email]],
      RoleID: [null, Validators.required],
      BranchID: [null, Validators.required],
      LoginName: ['', Validators.required],
      loginIdSource: [null, Validators.required], // Dropdown for selecting login ID source
      LoginID: [{ value: '', disabled: true }, [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  updateLoginId(source: string): void {
    const mobileNumber = this.addUserForm.get('MobileNumber')?.value;
    const emailID = this.addUserForm.get('EmailID')?.value;
    if (source === 'mobile') {
      this.addUserForm.get('LoginID')?.setValue(mobileNumber);
    } else if (source === 'email') {
      this.addUserForm.get('LoginID')?.setValue(emailID);
    }
  }

  submit(): void {
    if (this.addUserForm.invalid) return;

    const payload = {
      ...this.addUserForm.getRawValue(), 
      CreatedBy: this.username, 
      StatusID: 1,

    };
    this.schoolService.createLoginMaster(payload).subscribe({
      next: () => {
        this.notificationService.successAlert('Login Master  added successfully',"yes,go to login list ").subscribe((result) => {
          this.addUserForm.reset();
          if (result.confirmed) {
            this.router.navigate(['/superadmin/login-list']);
          }
        });
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
  param = {
    searchBy: '',
    searchValue: '',
    status: '',
    sortby: '',
    sortCode: 'desc',
    page: 0,
    limit: 10,
    BranchID:''
  };
  getRole() {
    this.schoolService.role(this.param).subscribe({
      next: (res: any) => {
        const roles = res?.result?.data;
        this.roles = roles?.data
      },
      error: (err: any) => {},
    });
  }

  getexist(event: any, searchBy: string) {
    this.spinnerLoading = true;
    this.param.searchValue = event.target.value;
    this.param.searchBy = searchBy;
  
    this.schoolService.existlist(this.param).subscribe({
      next: (res: any) => {
        this.spinnerLoading = false;
        this.data = res?.result?.data;
  
        if (this.data?.data && this.data.data.length > 0) {
          const existingValue = searchBy === 'MobileNumber' ? this.data.data[0].MobileNumber : this.data.data[0].EmailID;
          if (existingValue === event.target.value) {
            const alertMessage = searchBy === 'MobileNumber' 
              ? 'Mobile number already exists. Please try another.' 
              : 'Email ID already exists. Please try another.';
            this.notificationService.mobileExistAlert(alertMessage).subscribe((result: any) => {
              if (result.confirmed || result.dismissed) {
                this.addUserForm.controls[searchBy].setValue('');
              }
            });
          }
        }
      },
      error: (err: any) => {
        this.spinnerLoading = false;
        console.error(err);
      }
    });
  }
  getBranchList() {
    this.sharedService.getBranchID().pipe(take(1)).subscribe(branchID => {
      this.BranchId = branchID;
      this.param.searchBy = "BranchID";
      this.param.searchValue = this.BranchId 
      this.param.BranchID = this.BranchId;
     this.getRole()
      this.sharedService.getBranches().pipe(take(1)).subscribe(branches => {
        const branchDetails = branches?.SchoolBranceDetails || [];
        this.allSchoolData = branchDetails;
        const selectedBranch = branchDetails.find(
          (branch: { BranchID: any }) => branch.BranchID === branchID
        );
        if (selectedBranch) {
          this.addUserForm.patchValue({ BranchID: selectedBranch.BranchID });
        }
      });
    });
  }
  
  
  onBranchSelect(branchID: any): void {
    this.BranchId = branchID?.BranchID;
      this.param.searchBy = "BranchID";
      this.param.searchValue = this.BranchId 
      this.param.BranchID = this.BranchId;
      console.log(this.param);
    this.getRole()
  }
  getModuleList() {
    this.spinnerLoading = true;
    this.allModuleData = [];
    this.moduleService.moduleMaster(this.param).subscribe({
      next: (res: any) => {
        this.spinnerLoading = false 
        this.allModuleData = res?.result?.data;
        this.ModuleNameData = this.allModuleData?.data;
        console.log(this.ModuleNameData);
        
      },
      error: (err: any) => {
        this.spinnerLoading = false;
      },
    });
  }

  onModuleChange(event: any): void {
    const { state, value } = event;
    const module = this.ModuleNameData.find((mod: any) => mod.ModuleID === value);
    if (module) {
      module.Status = state;
    }
  }
}
