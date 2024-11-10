import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
import { MasterService } from '../../services/master.service';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
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
  alertTrigger: boolean | undefined;
  alertData: any;
  alertType: any;
  statuslist: any;
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
     
      { key: 'type', title: 'status' },
      { key: 'action', title: 'Action' },
    
    ];
    this.setInitValue();
    this.getstatus();
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

    this.masterService.createStatus(payload).subscribe((res: any) => {
      this.NotificationService.showInfo('Status Added Successfully');
      this.addUserForm.reset();
      this.getstatus()
    });
  }
  getstatus() {
    this.masterService.getstatus().subscribe((res: any) => {
      this.statuslist = res?.body?.result;
      console.log(this.statuslist);
    });
  }
}
