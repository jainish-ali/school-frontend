import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
import { MasterService } from '../../services/master.service';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss'],
})
export class UserTypeComponent {
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
  addUserForm!: FormGroup;
  userType: any;
  public configuration!: Config;
  public columns!: Columns[];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private masterService: MasterService,
    private NotificationService: NotificationService
  ) {}
  ngOnInit() {
    this.configuration = { ...DefaultConfig };
    this.configuration.checkboxes = false;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.hover = false;
    this.configuration.paginationRangeEnabled = false;
    this.configuration.paginationEnabled = false;
    this.columns = [
      { key: 'type', title: 'type' },
      { key: 'action', title: 'Action' },
    ];
    this.setInitValue();
    this.getuserType();
  }
  setInitValue() {
    this.addUserForm = this.fb.group({
      comp_name: ['', [Validators.required, Validators.pattern('')]],
    });
  }
  submit(formValue: any) {
    if (!formValue) return;
    let payload = {
      name: formValue.comp_name,
    };

    this.masterService.createUsertype(payload).subscribe((res: any) => {
      this.NotificationService.showInfo('User Type Added Successfully');
      this.addUserForm.reset();
      this.getuserType();
    });
  }
  getuserType() {
    this.masterService.getuserType().subscribe((res: any) => {
      this.userType = res?.body?.result;
      console.log(this.userType);
    });
  }
  convertToCamelCase(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.trim();

    // Convert to camel case
    value = value
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

    // Capitalize the first letter
    value = value.charAt(0).toUpperCase() + value.slice(1);
    console.log(value);

    // Update the form control value
    this.addUserForm.patchValue({
      comp_name: value,
    });
  }
}
