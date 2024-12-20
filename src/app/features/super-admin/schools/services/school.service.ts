import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/features/http-services/api.service';
import { API_CONSTANTS } from 'src/app/features/shared/constant/API-CONSTANTS';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  constructor(private apiService: ApiService) { }

  createSchool(payload: any): Observable<any> {
    let url = API_CONSTANTS.schools
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  deleteSchool(payload : any): Observable<any> {
    let url = API_CONSTANTS.deleteschool
    .replace("{schoolId}", payload)
    return this.apiService.delete(url, payload);
  }
  deletelogin(payload : any): Observable<any> {
    let url = API_CONSTANTS.deletelogin
    .replace("{loginid}", payload)
    return this.apiService.delete(url, payload);
  }
  schoollist(payload : any): Observable<any> {
    const url = API_CONSTANTS.schools
    return this.apiService.getDataWithParam(url, payload);
  }
  role(payload:any): Observable<any> {
    const url = API_CONSTANTS.rolelist
    return this.apiService.getDataWithParam(url,payload);
  }
  
  createLoginMaster(payload: any): Observable<any> {
    let url = API_CONSTANTS.createlogin
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  existlist(payload : any): Observable<any> {
    const url = API_CONSTANTS.mobileList
    return this.apiService.getDataWithParam(url, payload);
  }
  updateSchool(schoolId: any, payload: any): Observable<any> {
    const url = API_CONSTANTS.updateSchool.replace("{schoolId}", schoolId);
    return this.apiService.put(url, payload);
  }

  createBranch(payload: any): Observable<any> {
    let url = API_CONSTANTS.Branch
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
