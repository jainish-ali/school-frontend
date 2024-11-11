import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService,private router: Router) {}

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

  successAlert(message: string): Observable<{ confirmed: boolean; dismissed: boolean }> {
    return new Observable(observer => {
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
}
