import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { status } from 'src/app/features/shared/constant/company';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
import { ModuleService } from '../../services/module.service';
import { StorageService } from 'src/app/features/http-services/storage.service';

@Component({
  selector: 'app-add-module-master',
  templateUrl: './add-module-master.component.html',
  styleUrls: ['./add-module-master.component.scss'],
})
export class AddModuleMasterComponent {
  spinnerLoading= false
  buttonName = "Add Module";
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
  addModuleForm!: FormGroup;
  isStatusVisible: boolean = false;
  param = {
    searchBy: 'ModuleID',
    searchValue: '',
    status: '',
    sortby: '',
    sortCode: 'desc',
    page: 0,
    limit: 10,
  };
  username: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private moduleMasterService: ModuleService,
    private route: ActivatedRoute,
    private storageService : StorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.storageService.getItem("userDetail").subscribe((res: any) => {
      console.log(res,'userdetail');
      this.username = res.loginName
  })
    this.route.paramMap.subscribe((params) => {
      const moduleId = params.get('id');
      if (moduleId) {
        this.param.searchValue = moduleId;
        this.loadModuleData();
      }
    });
  }

  // Initialize the form
  initForm(): void {
    this.addModuleForm = this.fb.group({
      ModuleName: ['', [Validators.required]], // Accept letters and spaces
      Sort: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Accept numbers only
      Status: ['', this.isStatusVisible ? Validators.required : null], // Status for update only
    });
  }

  // Submit the form
  submit(formValue: any): void {
    if (!formValue) return;
    const payload: {
      ModuleName: string;
      Sort: string;
      Status?: number;
      ModifiedBy? : String
    } = {
      ModuleName: formValue.ModuleName,
      Sort: formValue.Sort,
      ModifiedBy:this.username,
      
    };

    if (this.buttonName === "Update Module") {
      payload.Status = formValue.Status?.title === 'Active' ? 1 : 0;
      this.moduleMasterService.updateModule(this.route.snapshot.paramMap.get('id'), payload).subscribe(() => {
        this.showAlert('Module updated successfully');
        this.addModuleForm.reset()
      });
    } else {
      this.moduleMasterService.createModule(payload).subscribe(() => {
        this.showAlert('Module added successfully');
        this.addModuleForm.reset()
      });
    }
  }

  // Show alert on success
  showAlert(message: string): void {
    this.notificationService.successAlert(message, "Go to Module List").subscribe((result) => {
      if (result.confirmed) {
        this.router.navigate(['/superadmin/module-master']);
      } else if (result.dismissed) {
        this.toggleStatusVisibility(false);
        this.buttonName = "Add Module";
      }
    });
  }

  // Load module data for editing
  loadModuleData(): void {
    this.moduleMasterService.moduleMaster(this.param).subscribe((res: any) => {
      const moduleData = res?.result?.data;
      if (moduleData) {
        this.patchFormValues(moduleData?.data);
        this.buttonName = "Update Module";
        this.toggleStatusVisibility(true);
      }
    });
  }

  // Patch form values for editing
  patchFormValues(data: any): void {
    this.addModuleForm.patchValue({
      ModuleName: data[0].ModuleName?.trim(),
      Sort: data[0].Sort,
      Status: data[0].Status,
    });
  }

  // Toggle status visibility
  toggleStatusVisibility(isVisible: boolean): void {
    this.isStatusVisible = isVisible;

    if (isVisible) {
      this.addModuleForm.get('Status')?.setValidators(Validators.required);
    } else {
      this.addModuleForm.get('Status')?.clearValidators();
    }
    this.addModuleForm.get('Status')?.updateValueAndValidity();
  }
}
