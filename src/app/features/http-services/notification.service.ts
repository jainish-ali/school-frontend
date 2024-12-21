import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { AddBranchComponent } from '../shared/components/add-branch/add-branch.component';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService,private router: Router, private modalService: BsModalService) {}

  /**
   * show success toastr
   * @param message 
   */
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  successAlerts(message: any) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: true,
      confirmButtonText: "Yes, go to School List",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      timer: 10000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to the school list page if 'Yes' is clicked
        this.router.navigate(['/superadmin/school-list']);
      }
    });
  }
  private successAlertSubject = new Subject<{ confirmed: boolean, dismissed: boolean }>();

  successAlert(message: string,confirmButton: any): Observable<{ confirmed: boolean; dismissed: boolean }> {
    return new Observable(observer => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: message,
        showConfirmButton: true,
        confirmButtonText:confirmButton,
        cancelButtonText: "Cancel",
        showCancelButton: true,
        timer: 10000,
        timerProgressBar: true,
      }).then((result) => {
        observer.next({
          confirmed: result.isConfirmed,
          dismissed: result.isDismissed
        });
        observer.complete();
      });
    });
  }
  mobileExistAlert(message: string): Observable<{ confirmed: boolean; dismissed: boolean }> {
    return new Observable(observer => {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: message,
        showConfirmButton: true,
        confirmButtonText: "Okay",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        timer: 10000,
        timerProgressBar: true,
      }).then((result) => {
        observer.next({
          confirmed: result.isConfirmed,
          dismissed: result.isDismissed
        });
        observer.complete();
      });
    });
  }
  

  /**
   * show eroor toastr
   * @param message 
   */
  showError(message: string) {
    this.toastr.error(message);
  }


  /**
   * show information toastr
   * @param message 
   */
  showInfo(message: string) {
    this.toastr.info(message);
  }


  /**
   * show warning tastr
   * @param message 
   */
  showWarning(message: string) {
    this.toastr.warning(message);
  }

  loginErrorAlert(message: string) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Login Failed",
      text: message,
      showConfirmButton: true,
      confirmButtonText: "Retry",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      timer: 10000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Action when "Retry" is clicked, e.g., focus on the login input
        console.log("Retry login process"); // Replace with any action needed
      }
    });
  }
  errorAlert(message: string, confirmButton: any): Observable<{ confirmed: boolean; dismissed: boolean }> {
    return new Observable(observer => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: message,
        showConfirmButton: true,
        confirmButtonText: confirmButton,
        cancelButtonText: "Cancel",
        showCancelButton: true,
        timer: 10000,
        timerProgressBar: true,
      }).then((result) => {
        observer.next({
          confirmed: result.isConfirmed,
          dismissed: result.isDismissed
        });
        observer.complete();
      });
    });
  }
  

  loginSuccessAlert(message: string, decodedToken: any,data: any) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Login Successful",
      text: message,
      showConfirmButton: true,
      confirmButtonText: "Go to Dashboard",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      timer: 10000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (decodedToken?.branchId[0] == null &&  decodedToken?.roleId !== 1) {
          Swal.fire({
            icon: "error",
            title: "No Active Branch",
            text: "You don't have an active branch. Please add a branch to proceed.",
            confirmButtonText: "Add Branch",
          }).then((result) => {
            if (result.isConfirmed) {
              this.openBranchModal(decodedToken,data)
               }
          });
          return; 
        }
  
        if (decodedToken?.roleId == 1) {
          this.router.navigate(["superadmin/school-list"]);
        } else if (decodedToken?.roleId == 31) {
          this.router.navigate(["admin/manage-role"]);
        } else if (decodedToken?.roleId == 3) {
          this.router.navigate(["inquiry/inquiryform"]);
        }
      }
    });
  }
  modalRef?: BsModalRef;
  openBranchModal(data: any,branch: any) {
    console.log(data); 
    const initialState: ModalOptions = {
      initialState: {
        data:data,
        school:branch
      },

    };
    this.modalRef = this.modalService.show(
      AddBranchComponent,
      Object.assign(initialState, {
        id: 'confirmation',
        class: 'modal-xl modal-dialog-centered',
      })
    );
  }

  BranchAlert(message: string) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Branch",
      text: message,
      showConfirmButton: true,
      confirmButtonText: "Retry",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      timer: 10000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Action when "Retry" is clicked, e.g., focus on the login input
        console.log("Retry login process"); // Replace with any action needed
      }
    });
  }
  
}
