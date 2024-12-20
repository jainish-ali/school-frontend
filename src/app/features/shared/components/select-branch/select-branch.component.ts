import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { StorageService } from 'src/app/features/http-services/storage.service';

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.scss']
})
export class SelectBranchComponent {
  branchData: any;
  selectedBranchID: number | null = null; // To track selected branch
  userType: any;

  constructor(private modalService: BsModalService,
    private storageService : StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.branchData = this.modalService.config.initialState;
  }

  // Set the selected branch
  selectBranch(branchID: number,i: number) {
    this.selectedBranchID = branchID;
    this.storageService.setItem("selected",this.branchData[i])
    this.closeModal()
   
    
    this.storageService.getItem("userDetail").subscribe((res: any) => {
       if(res.roleName == 'Admin'){
        this.router.navigate(["admin/manage-role"]);
    }
     });

  }
  closeModal(): void {
    this.modalService.hide();
  }
}
