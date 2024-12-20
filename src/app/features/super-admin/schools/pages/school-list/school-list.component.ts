import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { SchoolService } from '../../services/school.service';
import { ConfirmationDialogComponent } from 'src/app/features/shared/components/confirmation-dialog/confirmation-dialog.component';
import { limit, searchBy, status } from 'src/app/features/shared/constant/company';
import { Router } from '@angular/router';

@Component({
  selector: 'school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent {
  
  searchBy = searchBy;
  status = status;
  limit = limit;
  public columns!: Columns[];
  public configuration!: Config;
  spinnerLoading: boolean = false;
  schoolList: any;
  totlRecords: any;
  allSchoolData: any;
  tableLoading: boolean = false;
  alertType: string = "success";
  alertTrigger: boolean = false;
  alertData: any = {
    message: "success",
  };
  
  modalRef?: BsModalRef;
  
  constructor(
    private schoolService: SchoolService,
    private modalService: BsModalService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.checkboxes = false;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.hover = false;
    this.configuration.paginationRangeEnabled = false;
    this.configuration.paginationEnabled = false;
    this.columns = [
      { key: 'School Name', title: 'School Name', width:'30%' },
      { key: 'Contact No', title: 'Contact No',width:'10%' },
      { key: 'Email ID', title: 'Email ID',width:'10%' },
      { key: 'Address', title: 'Address',width:'35%' },
      { key: 'Status', title: 'Status',width:'10%' },
      { key: 'delete', title: 'Action',width:'5%' },
    ];

    this.getSchoolList({})
  }
  getSchoolList(event: any) {
    this.spinnerLoading = true;
    this.totlRecords = 0;
    this.allSchoolData = [...[], ...[]];
    
    this.tableLoading = true;
    this.schoolService
      .schoollist(
        this.param
      )
      .subscribe({
        next: (res : any) => {
          this.allSchoolData = res?.result?.data
          console.log(this.allSchoolData)
          this.totlRecords = this.allSchoolData.pagination?.totalResults || 0;
         this.stopAlert()
        },
        error:
          (err: any) => {
            this.tableLoading = false;
          }

      });
  }
  data: any[] = [];
  pageIndex: number = 1;
  tableItemsSize: number = 10;
  startValue: number = this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
  lastValue: number = this.startValue + this.tableItemsSize - 1;
  
  onTableDataChange(event: any) {
    this.pageIndex = event;
    this.startValue = this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
    this.lastValue = this.startValue + this.tableItemsSize - 1;
    this.lastValue = this.lastValue > this.data.length ? this.data.length : this.lastValue;
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
  
  onTablePageChange(event: any) {
    this.param.page = event - 1;
    this.pageIndex = event;
    this.getSchoolList(event - 1);
  }
  
  onSearchBY(event: any): void {
    this.param.searchBy = event == undefined ? '' : event;
  }
  
  onSearchSchools(inputValue: any): void {
    this.param.searchValue = inputValue.target.value == undefined ? '' : inputValue.target.value;
    this.getSchoolList(this.param);
  }
  
  onStatusChange(event: any): void {
    this.param.status = event == undefined ? '' : event;
    this.getSchoolList(0);
  }
  
  stopAlert() {
    this.spinnerLoading = false;
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }
  
  deleteSchool(id: any, name: any) {
    this.openConfirmationModal({
      title: "Remove" + " - " + name,
      content: "Do you really want to remove this school?",
      primaryActionLabel: "YES",
      secondaryActionLabel: "NO",
      onPrimaryAction: () => this.remove(id),
    });
  }
  
  remove(id: any) {
    this.schoolService.deleteSchool(id).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      if (res?.body?.message === 'Success') {
        this.alertData = {
          message: "School removed successfully",
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
       this.getSchoolList({});
      }
    });
  }
  
  openConfirmationModal(data = {}) {
    const initialState: ModalOptions = {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: { ...data },
    };
    this.modalRef = this.modalService.show(
      ConfirmationDialogComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
  }
  navigateToAddSchool(schoolID: string | number) {
    this.router.navigate([`superadmin/add-school`, schoolID]);
  }
  getClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'bi bi-check-circle-fill text-success';
      case 'Inactive':
        return 'bi bi-x-circle-fill text-danger';
      default:
        return 'bi bi-x-circle-fill text-danger';
    }
  }
}
