import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultConfig } from 'ngx-easy-table';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
import { SchoolService } from '../../services/school.service';
import { status } from 'src/app/features/shared/constant/company';

@Component({
  selector: 'add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent {
  buttonName = "Schools";
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
    searchBy: 'SchoolID',
    searchValue: '',
    status: '',
    sortby: '',
    sortCode: 'desc',
    page: 0,
    limit: 10,
  };
  addSchoolForm!: FormGroup;
  configuration: any;
  columns: { key: string; title: string; }[] | any;
  spinnerLoading: boolean = false;
  allSchoolData: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private NotificationService: NotificationService,
    private schoolService: SchoolService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.configuration= { ...DefaultConfig };
    this.configuration.checkboxes = false;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.hover = false;
    this.configuration.paginationRangeEnabled = false;
    this.configuration.paginationEnabled = false;
    this.setInitValue();
    this.route.paramMap.subscribe((params) => {
      const schoolId = params.get('id');
      if (schoolId) {
        this.param.searchValue = schoolId;
        this.getSchoolList();
      }
    });
  }
  isStatusVisible: boolean = false;
  setInitValue() {
    this.addSchoolForm = this.fb.group({
      schoolName: ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]], // Accepts letters and spaces only
      address: ['', [Validators.required]], // Simple required validation
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Allows only 10-digit numbers
      emailID: ['', [Validators.required, Validators.email]], // Email validation
      faxNo: ['', [Validators.pattern('')]], // Optional, allows only 10-digit numbers
      website: ['', [Validators.pattern('')]], // Optional, checks for a valid URL format
      logo: [''], // Optional, no specific validation
      status: ['', this.isStatusVisible ? Validators.required : null],
    });
  }

  submit(formValue: any) {
    if (!formValue) return;
    let payload: {
      schoolName: any;
      address: any;
      contactNo: any;
      emailID: any;
      faxNo: any;
      website: any;
      logo: any;
      status?: any;
    } = {
      schoolName: formValue?.schoolName,
      address: formValue?.address,
      contactNo: formValue?.contactNo,
      emailID: formValue?.emailID,
      faxNo: formValue?.faxNo,
      website: formValue?.website,
      logo: formValue?.logo
    };

    if (this.buttonName === "Update School") {
      payload.status = formValue?.status;
      this.schoolService.updateSchool(this.param.searchValue, payload).subscribe((res: any) => {
        this.addSchoolForm.reset();
        this.showAlert('School updated Successfully');
      });
    } else {
      this.schoolService.createSchool(payload).subscribe((res: any) => {
        this.addSchoolForm.reset();
        this.showAlert('School Added Successfully');
      });
    }
  }
  showAlert(message: string) {
    this.NotificationService.successAlert(message,"Yes, go to School List").subscribe((result) => {
      if (result.confirmed) {
        this.router.navigate(['/superadmin/school-list']);
      } else if (result.dismissed) {
        this.toggleStatusVisibility(false);
        this.buttonName ="Add School"
      }
    });
  }
  getSchoolList(event?: any): void {
    this.spinnerLoading = true;
    this.allSchoolData = [...[], ...[]];

    this.schoolService.schoollist(this.param).subscribe({
      next: (res: any) => {
        this.allSchoolData = res?.result?.data || [];
        this.spinnerLoading = false;
        const schoolData = this.allSchoolData?.data[0];
        if (schoolData) {
          this.patchFormValues(schoolData);
          this.buttonName = "Update School";
          this.toggleStatusVisibility(true)
        }
      },
      error: (err: any) => {
        this.spinnerLoading = false;
        console.error(err); // Log error if needed
      },
    });
  }
  patchFormValues(data: any): void {
    this.addSchoolForm.patchValue({
      schoolName: data.SchoolName?.trim(),
      address: data.Address?.trim(),
      contactNo: data.ContactNo?.trim(),
      emailID: data.EmailID?.trim(),
      faxNo: data.FaxNo?.trim(),
      website: data.Website?.trim(),
      logo: data.Logo,
      status: data.status
    });
  }
  onStatusChange(event: any): void {
    this.param.status = event == undefined ? '' : event;
  }
  toggleStatusVisibility(isVisible: boolean) {
    this.isStatusVisible = isVisible;

    if (isVisible) {
      this.addSchoolForm.get('status')?.setValidators(Validators.required);
    } else {
      this.addSchoolForm.get('status')?.clearValidators();
    }
    this.addSchoolForm.get('status')?.updateValueAndValidity();
  }
}
