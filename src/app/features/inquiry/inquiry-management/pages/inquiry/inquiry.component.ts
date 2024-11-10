import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { MasterService } from 'src/app/features/admin/manage-user/services/master.service';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
import { InquiryService } from '../../services/inquiry.service';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss']
})
export class InquiryComponent {
  breadcrumbItems: BreadcrumbItems = [
    {
      name: 'Home',
      path: '/residential',
      active: false,
    },

    {
      name: 'Create User',
      path: '',
      active: true,
    },
  ];
  bulk = [
    {
      id: 'true',
      title: 'Yes',
    },
    {
      id: 'false',
      title: 'No',
    },
  ];

  addUserForm!: FormGroup;
  alertTrigger: boolean | undefined;
  alertData: any;
  alertType: any;
  userType: any;
  userlist: any;
  public configuration!: Config;
  public columns!: Columns[];
  spinnerLoading: boolean | undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private masterService: MasterService,
    private NotificationService: NotificationService,
    private inquiryService: InquiryService
  ) {}
  ngOnInit() {
    this.configuration= { ...DefaultConfig };
    this.configuration.checkboxes = false;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.hover = false;
    this.configuration.paginationRangeEnabled = false;
    this.configuration.paginationEnabled = false;
    this.columns = [
     
      { key: ' Name', title: ' Name' },
      { key: 'Mobile Number', title: 'Mobile Number' },
      { key: 'Email', title: 'Email' },
      { key: 'Role', title: 'Role' },
      { key: 'Role', title: 'Bulk sms' },
      { key: 'delete', title: 'Action' },
    ];
    this.setInitValue();
    this.getuserType()
  }
  setInitValue() {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('')]],
      mobile: ['', [Validators.required, Validators.pattern('')]],
      date: [new Date(), [Validators.required, Validators.pattern('')]],
      text: ['', [Validators.required, Validators.pattern('')]],
      type: ['', [Validators.required, Validators.pattern('')]],
    });
  }
  submit(formValue: any) {
    this.spinnerLoading = true
    if (!formValue) return;
    console.log(formValue);
    
    let payload = {
      "customer_name":formValue.name,
      "email":formValue.email,
      "phone_number":formValue.mobile,
      "inquiry_text":formValue.text,
      "inquiry_type_id":formValue.type,
   "inquiry_date":formValue.date
    };

    this.inquiryService.createinquiry(payload).subscribe((res: any) => {
      this.NotificationService.showSuccess('Inquiry Added Successfully');
      this.addUserForm.reset();
      this.getuserType()
      this.spinnerLoading = false
    });
  }
  getuserType() {
    this.masterService.getinquirytypelist().subscribe((res: any) => {
      this.userType = res?.body?.result;
      console.log(this.userType);
      
    })
    this.masterService.userlist().subscribe((res: any) => {
      this.userlist =res.body.result
      console.log(this.userlist);
      
    })
  }
}
