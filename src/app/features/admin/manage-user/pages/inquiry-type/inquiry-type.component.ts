import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbItems } from 'src/app/features/shared/interfaces';
import { MasterService } from '../../services/master.service';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-inquiry-type',
  templateUrl: './inquiry-type.component.html',
  styleUrls: ['./inquiry-type.component.scss']
})
export class InquiryTypeComponent {
  breadcrumbItems: BreadcrumbItems = [
    {
      name: "Home",
      path: "/residential",
      active: false,
    },

   
    
    {
      name: "Inquiry Type",
      path: "",
      active: true,
    },
  ];
  addUserForm!: FormGroup;
  alertTrigger: boolean | undefined;
  alertData: any;
  alertType: any;
  typelist: any;
  public configuration!: Config;
  public columns!: Columns[];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private masterService:MasterService,
    private NotificationService:NotificationService
  ) { }
  ngOnInit(){
    this.configuration= { ...DefaultConfig };
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
    this.gettypelist()
  }
  setInitValue() {
    this.addUserForm = this.fb.group({
      comp_name: ['', [Validators.required, Validators.pattern('')]],
        })
  }
  submit(formValue: any) {
    if (!formValue) return;
    let payload = {
      "type_name": formValue.comp_name,
     
    }

    this.masterService.createInquiryType(payload).subscribe((res: any) => {
      
      this.NotificationService.showInfo(
        "inquiry Type Added Successfully"
      );
        this.addUserForm.reset()
        this.gettypelist()
      } 
    )
   
    
  }
  gettypelist() {
    this.masterService.getinquirytypelist().subscribe((res: any) => {
      this.typelist = res?.body?.result;
      console.log(this.typelist);
      
    })
  }
}
