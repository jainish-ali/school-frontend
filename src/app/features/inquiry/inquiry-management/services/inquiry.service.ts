
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from 'src/app/features/http-services/api.service';
import { API_CONSTANTS } from 'src/app/features/shared/constant/API-CONSTANTS';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  constructor(private apiService: ApiService) { }
  createinquiry(payload: any): Observable<any> {
    let url = API_CONSTANTS.createinquiry
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  inquirylist(payload : any): Observable<any> {
    const url = API_CONSTANTS.inquirylist
    return this.apiService.getDataWithParam(url, payload);
  }
  deleteinquiry(payload : any): Observable<any> {
    let url = API_CONSTANTS.deleteinquiry
    .replace("{id}", payload)
    return this.apiService.delete(url, payload);
  }
}
