import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from 'src/app/features/http-services/api.service';
import { API_CONSTANTS } from 'src/app/features/shared/constant/API-CONSTANTS';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private apiService: ApiService) { }
  createStatus(payload: any): Observable<any> {
    let url = API_CONSTANTS.createStatus
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  createUsertype(payload: any): Observable<any> {
    let url = API_CONSTANTS.createUsertype
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  createuser(payload: any): Observable<any> {
    let url = API_CONSTANTS.createuser
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  
  getuserType(): Observable<any> {
    let url = API_CONSTANTS.getuserType
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  userlist(): Observable<any> {
    let url = API_CONSTANTS.userlist
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  getinquirytypelist(): Observable<any> {
    let url = API_CONSTANTS.getinquirytypelist
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  getstatus(): Observable<any> {
    let url = API_CONSTANTS.getstatus
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  
  createInquiryType(payload: any): Observable<any> {
    let url = API_CONSTANTS.createInquiryType
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  userbyid(email : any) {
    let url = API_CONSTANTS.userbyid
      .replace("{email}", email)
    return this.apiService.get(url);
  }
}
