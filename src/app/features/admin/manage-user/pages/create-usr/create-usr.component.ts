import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
import { MasterService } from '../../services/master.service';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-create-usr',
  templateUrl: './create-usr.component.html',
  styleUrls: ['./create-usr.component.scss'],
})
export class CreateUsrComponent {
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private masterService: MasterService,
    private NotificationService: NotificationService
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
      email: ['', [Validators.required, Validators.pattern('')]],
      password: ['', [Validators.required, Validators.pattern('')]],
      bulk: ['', [Validators.required, Validators.pattern('')]],
      usertype: ['', [Validators.required, Validators.pattern('')]],
    });
  }
  submit(formValue: any) {
    if (!formValue) return;
    console.log(formValue);
    
    let payload = {
      username: formValue?.name,
      password:formValue?.password,
      user_type_id:formValue?.usertype,
      notification:formValue.bulk,
      mobile:formValue?.mobile,
      email:formValue?.email
    };

    this.masterService.createuser(payload).subscribe((res: any) => {
      this.NotificationService.showSuccess('User Added Successfully');
      this.addUserForm.reset();
      this.getuserType()
    });
  }
  getuserType() {
    this.masterService.getuserType().subscribe((res: any) => {
      this.userType = res?.body?.result;
      console.log(this.userType);
      
    })
    this.masterService.userlist().subscribe((res: any) => {
      this.userlist =res.body.result
      console.log(this.userlist);
      
    })
  }
}
