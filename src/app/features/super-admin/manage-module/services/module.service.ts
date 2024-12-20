
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/features/http-services/api.service';
import { API_CONSTANTS } from 'src/app/features/shared/constant/API-CONSTANTS';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  constructor(private apiService: ApiService) { }

 
  // deleteSchool(payload : any): Observable<any> {
  //   let url = API_CONSTANTS.deleteschool
  //   .replace("{schoolId}", payload)
  //   return this.apiService.delete(url, payload);
  // }
 
  module(payload : any): Observable<any> {
    const url = API_CONSTANTS.pageModule
    return this.apiService.getDataWithParam(url, payload);
  }
 
  createModulePage(payload : any): Observable<any> {
    const url = API_CONSTANTS.pageModule
    return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  
  UpdatemodulePage(PageId: any, payload: any): Observable<any> {
    const url = API_CONSTANTS.UpdatepageModule.replace("{PageId}", PageId);
    return this.apiService.put(url, payload);
  }

  deleteModule(payload : any): Observable<any> {
    let url = API_CONSTANTS.pageModule+ '/' + payload
    return this.apiService.delete(url, payload);
  }
  

  moduleMaster(payload : any): Observable<any> {
    const url = API_CONSTANTS.moduleMaster
    return this.apiService.getDataWithParam(url, payload);
  }
  deleteModuleMaster(payload : any): Observable<any> {
    let url = API_CONSTANTS.moduleMaster+ '/' + payload
    return this.apiService.delete(url, payload);
  }
  createModule(payload: any): Observable<any> {
    let url = API_CONSTANTS.moduleMaster
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  
  updateModule(id: any, payload: any): Observable<any> {
    const url = API_CONSTANTS.moduleMaster+ '/' + id;
    return this.apiService.put(url, payload);
  }
}
