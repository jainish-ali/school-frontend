import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/features/http-services/api.service';
import { API_CONSTANTS } from 'src/app/features/shared/constant/API-CONSTANTS';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private apiService: ApiService) { }
 role(payload:any): Observable<any> {
    const url = API_CONSTANTS.rolelist
    return this.apiService.getDataWithParam(url,payload);
  }
  

  createrole(payload: any): Observable<any> {
    console.log(payload);
    
    let url = API_CONSTANTS.rolelist
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  updateRole(roleid: any, payload: any): Observable<any> {
    const url = API_CONSTANTS.roleAction.replace("{roleId}", roleid);
    return this.apiService.put(url, payload);
  }
  deleteRole(payload : any): Observable<any> {
    let url = API_CONSTANTS.roleAction
    .replace("{roleId}", payload)
    return this.apiService.delete(url, payload);
  }
  
}
