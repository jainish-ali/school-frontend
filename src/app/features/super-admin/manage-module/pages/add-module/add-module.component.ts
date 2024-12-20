import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
import { status } from 'src/app/features/shared/constant/company';
import { ModuleService } from '../../services/module.service';
import { StorageService } from 'src/app/features/http-services/storage.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent {
  buttonName = 'Add Module Page';
  status = status;
  breadcrumbItems: BreadcrumbItems = [
    {
      name: 'Home',
      path: '/',
      active: false,
    },
    {
      name: this.buttonName,
      path: '',
      active: true,
    },
  ];
  param = {
    searchBy: 'ModulePageID',
    searchValue: '',
    status: '',
    sortby: '',
    sortCode: 'desc',
    page: 0,
    limit: 10000,
  };
  addModulePageForm!: FormGroup;
  spinnerLoading: boolean = false;
  isStatusVisible: boolean = false;
  allModuleData: any;
  ModuleNameData: any;
  username: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    private storageService : StorageService
  ) {}

  ngOnInit() {
    this.setInitValue();
    this.getModuleList()
    this.storageService.getItem("userDetail").subscribe((res: any) => {
      console.log(res,'userdetail');
      this.username = res.loginName
  })
    this.route.paramMap.subscribe((params) => {
      const modulePageId = params.get('id');
      if (modulePageId) {
        this.param.searchValue = modulePageId;
        this.param.searchBy= "ModulePageID"
        this.getModulePageDetails();
      }
    });
  }

  setInitValue() {
    this.addModulePageForm = this.fb.group({
      ModuleName :[null, [Validators.required]],
      pageName: ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]], // Accepts letters and spaces
      page: ['', [Validators.required]], // Simple required validation
      status: ['', this.isStatusVisible ? Validators.required : null], // Optional, only if status is visible
    });
  }

  submit(formValue: any) {
    console.log(this.addModulePageForm.get('ModuleName')?.value);
    if (!formValue) return;

    let payload: {
      pageName: string;
      page: string;
      status?: number;
      ModuleID?:number
      CreatedBy?:string,
      Status? :number
    } = {
      pageName: formValue.pageName,
      page: formValue.page,
      ModuleID: this.addModulePageForm.get('ModuleName')?.value,
      CreatedBy:this.username
    };

    if (this.buttonName === 'Update Module Page') {
      payload.Status = formValue.Status?.title === 'Active' ? 1 : 0;
      this.moduleService.UpdatemodulePage(this.param.searchValue, payload).subscribe((res) => {
        if(res?.body?.success){
          this.addModulePageForm.reset();
          this.showAlert('Module Page updated successfully');
        }
        else{
          this.showerror('something went wrong, please try again');
        }
      });
    } else {
      this.moduleService.createModulePage(payload).subscribe((res) => {
        if(res?.body?.success){
          this.addModulePageForm.reset();
          this.showAlert('Module Page added successfully');
        }
        else{
          this.showerror('something went wrong, please try again');
        }
      });
    }
  }

  getModulePageDetails(): void {
    this.spinnerLoading = true;
    this.moduleService.module(this.param).subscribe({
      next: (res: any) => {
        const fetcheddata = res?.result?.data;
        if (fetcheddata) {
          this.patchFormValues(fetcheddata?.data);
          this.buttonName = 'Update Module Page';
          this.toggleStatusVisibility(true);
        }
        this.spinnerLoading = false;
      },
      error: (err: any) => {
        this.spinnerLoading = false;
        console.error(err);
      },
    });
  }

  patchFormValues(data: any): void {
    const selectedModule = this.ModuleNameData.find(
      (module: { ModuleName: any; }) => module.ModuleName === data[0].ModuleMaster?.ModuleName
    );
    this.addModulePageForm.patchValue({
      ModuleName: selectedModule?.ModuleID,
      pageName: data[0].PageName?.trim(),
      page: data[0].Page?.trim(),
      status: data[0].Status,
    });
  }
showerror(message:any){
  this.notificationService
  .errorAlert(message, 'Yes, go to Module Page List')
  .subscribe((result) => {
    if (result.confirmed) {
      this.router.navigate(['/superadmin/module-page-list']);
    } else if (result.dismissed) {
      this.addModulePageForm.reset();
    }
  });
}
  showAlert(message: string): void {
    this.notificationService
      .successAlert(message, 'Yes, go to Module Page List')
      .subscribe((result) => {
        if (result.confirmed) {
          this.router.navigate(['/superadmin/module-page-list']);
        } else if (result.dismissed) {
          this.toggleStatusVisibility(false);
          this.buttonName = 'Add Module Page';
        }
      });
  }

  toggleStatusVisibility(isVisible: boolean): void {
    this.isStatusVisible = isVisible;

    if (isVisible) {
      this.addModulePageForm.get('status')?.setValidators(Validators.required);
    } else {
      this.addModulePageForm.get('status')?.clearValidators();
    }
    this.addModulePageForm.get('status')?.updateValueAndValidity();
  }

  onStatusChange(event: any): void {
    this.param.status = event == undefined ? '' : event;
  }

  getModuleList() {
    this.spinnerLoading = true;
    this.allModuleData = [];
    this.moduleService.moduleMaster(this.param).subscribe({
      next: (res: any) => {
        this.spinnerLoading = false 
        this.allModuleData = res?.result?.data;
        this.ModuleNameData = this.allModuleData?.data;
      },
      error: (err: any) => {
        this.spinnerLoading = false;
      },
    });
  }
}
