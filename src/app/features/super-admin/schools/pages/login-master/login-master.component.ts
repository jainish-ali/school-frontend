import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
import { SchoolService } from '../../services/school.service';
import { StorageService } from 'src/app/features/http-services/storage.service';

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

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private schoolService: SchoolService,
    public storageService : StorageService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getRole();
    this.getSchoolList(0)
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
      SchoolID: [null, Validators.required],
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
  };
  getRole() {
    this.schoolService.role(this.param).subscribe({
      next: (res: any) => {
        const roles = res?.result?.data;
        this.roles = roles?.data
        console.log(this.roles);
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
  getSchoolList(event: any) {
    this.param.limit=1000
    this.allSchoolData = [...[], ...[]];
    this.schoolService
      .schoollist(
        this.param
      )
      .subscribe({
        next: (res : any) => {
        const allSchoolData = res?.result?.data
        this.allSchoolData = allSchoolData?.data
          console.log(this.allSchoolData)
        },
        error:
          (err: any) => {
          }

      });
  }
  
}
