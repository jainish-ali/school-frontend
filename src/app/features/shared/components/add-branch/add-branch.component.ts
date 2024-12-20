import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BreadcrumbItems } from '../../interfaces';
import { SchoolService } from 'src/app/features/super-admin/schools/services/school.service';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/features/http-services/shared.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent {
  schoolData: any; // Input to receive initialState
  addBranchForm: FormGroup;
  spinnerLoading = false;
  buttonName = 'Create Branch';
  breadcrumbItems: BreadcrumbItems = [
    {
      name: 'Login',
      path: '/',
      active: false,
    },

    {
      name: this.buttonName,
      path: '',
      active: true,
    },
  ];
  SchoolName: any;
  address: any;
  contactNumber: any;
  SchoolID: any;

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef ,
    private modalService: BsModalService,
    private schoolService: SchoolService,
    private notificationService: NotificationService,
    private router : Router,
  ) {
    this.addBranchForm = this.fb.group({
      SchoolID: ['', Validators.required],
      BranchName: ['', Validators.required],
      Address: ['', Validators.required],
      ContactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      EmailID: ['', [Validators.required, Validators.email]],
      FaxNo: [''],
      Website: ['']
    });
  }

  ngOnInit(): void {
    this.schoolData = this.modalService.config.initialState;
    console.log(this.schoolData);
    
    this.SchoolName = this.schoolData?.school.SchoolName
    this.address= this.schoolData?.school.Address;
    this.contactNumber = this.schoolData?.school.ContactNumber,
    this.SchoolID = this.schoolData?.school.SchoolID
    if (this.schoolData) {
      this.addBranchForm.get('SchoolID')?.setValue(this.SchoolID);
      this.addBranchForm.get('SchoolID')?.disable();
    }
  }

  onSubmit() {
    if (this.addBranchForm.valid) {
      this.spinnerLoading = true;
      const payload = {
        ...this.addBranchForm.getRawValue(),
        StatusID: 1,
        loginId:this.schoolData?.data.loginId
      };
      console.log(payload);
      this.schoolService.createBranch(payload).subscribe({
        next: () => {
          this.notificationService.successAlert('Branch added successfully','go to Login').subscribe((result) => {
            this.spinnerLoading = false;
            if (result.confirmed) {
              this.modalService.hide();
            } else if (result.dismissed) {
              console.log('User canceled the action');
            }
          });
          this.addBranchForm.reset();
        },
        error: (err: any) => {
          console.error(err);
          this.spinnerLoading = false;
        },
      });
    }
  }
  
}
