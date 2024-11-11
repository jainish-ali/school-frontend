import { Component } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

import {searchBy, status, limit} from '../../../../shared/constant/company'
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { InquiryService } from '../../services/inquiry.service';
import { MasterService } from 'src/app/features/admin/manage-user/services/master.service';
import { ConfirmationDialogComponent } from 'src/app/features/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss']
})
export class InquiryListComponent {
  searchByCompany = searchBy;
  status = status;
  limit = limit;
  public columns!: Columns[];
  public configuration!: Config;
  spinnerLoading: any = false;
  companyList: any;
  totlRecords: any;
  allquoteData: any;
  tableLoading: any = false ;
  alertType: any = "success";
  alertTrigger: any = false;
  alertData: any = {
    message: "success",
  };

  modalRef?: BsModalRef;
  inquiryType: any;
  constructor(
    private modalService: BsModalService,
    private inquiryService : InquiryService,
    private masterService : MasterService) {}
  ngOnInit(): void {
    this.configuration= { ...DefaultConfig };
    this.configuration.checkboxes = false;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.hover = false;
    this.configuration.paginationRangeEnabled = false;
    this.configuration.paginationEnabled = false;
    this.columns = [
     
      { key: 'Company Name', title: " Name" },
      { key: 'Mobile Number', title: 'Mobile Number' },
      { key: 'Contact Person', title: 'Email' },
      { key: 'Address', title: 'Inquiry' },
      { key: 'Status', title: 'Inquiry Type' },
      { key: 'delete', title: 'Action' },
    ];
    this.getQuoteList(0);
    this.getinquiryType()
    
  }
  data: any[] = [];
  pageIndex: number = 1;
  tableItemsSize: number = 10;
  startValue: number =
    this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
  lastValue: number = this.startValue + this.tableItemsSize - 1;
  onTableDataChange(event: any) {
    this.pageIndex = event;
    this.startValue =
      this.pageIndex * this.tableItemsSize - (this.tableItemsSize - 1);
    this.lastValue = this.startValue + this.tableItemsSize - 1;
    this.lastValue =
      this.lastValue > this.data.length ? this.data.length : this.lastValue;
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
  getQuoteList(event: any) {
    this.spinnerLoading = true;
    this.totlRecords = 0;
    this.allquoteData = [...[], ...[]];
    
    this.tableLoading = true;
    // if (this.param.searchBy === '')
    this.inquiryService
      .inquirylist(
        this.param
      )
      .subscribe({
        next: (res : any) => {
         console.log("company list ===========>",res);
          this.allquoteData = res?.result?.data
          console.log(this.allquoteData)
          console.log('getall quot', this.allquoteData);
          this.totlRecords = res?.result?.pagination?.totalResults || 0;
     
         this.stopAlert()
        },
        error:
          (err: any) => {
            this.tableLoading = false;
          }

      });
  }
  onTablePageChange(event: any) {
   
    this.param.page = event - 1;
    this.pageIndex = event;
    // this.getQuoteList(event - 1);
    
  }
  onSearchBY(event: any): void {
    console.log("serach by ==========>" , event);
    const value = event;
    this.param.searchBy = value == undefined ? '' : value;
  //  this.getQuoteList(0)
  }
  onSearchQuotes(inputValue: any): void {
    this.param.searchValue = inputValue.target.value == undefined ? '' : inputValue.target.value;;
    this.getQuoteList(0);

  }
  onStatusChange(event: any): void {

    
    this.param.status = event == undefined ? '' : event;
    this.getQuoteList(0);

  }

  stopAlert() {
 
    setTimeout(() => {
      this.spinnerLoading = false;
      this.alertTrigger = false;
    }, 2000);
  }
  getinquiryType() {
    this.masterService.getinquirytypelist().subscribe((res: any) => {
      this.inquiryType = res?.body?.result;
      
    })
  }
  deleteComp(id: any) {
    this.openConfirmationModal({
      content: "Do you really want to Remove?",
      primaryActionLabel: "YES",
      secondaryActionLabel: "NO",
      onPrimaryAction: () => this.remove(id),
    });
  }
  openConfirmationModal(data = {}) {
    const initialState: ModalOptions = {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        ...data,
      },
    };
    this.modalRef = this.modalService.show(
      ConfirmationDialogComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
  }
  remove(id : any) {
    console.log("check id ==========>",id);
    
    this.inquiryService
      .deleteinquiry(id)
      .subscribe((res: any) => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        if (res?.body?.message == 'Success') {
          this.alertData = {
            message: "inquiry removed successfully",
          };
          this.alertType = "success";
          this.alertTrigger = true;
          this.stopAlert();
          this.getQuoteList(0);
        }
      }),
      (err: any) => { };
  }
}
