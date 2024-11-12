import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
// import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

import { UserService } from '../shared/user/services/user.service';
import { ActivityService } from '../shared/user/services/activity.service';
import { SharedModule } from '../shared/shared.module';
import { SharedService } from './shared.service';
import { NotificationService } from './notification.service';
import { MasterService } from '../admin/manage-user/services/master.service';
import { JwtService } from './jwt.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  secondsToRefreshBeforeExpiring = 10;
  tokenSubject: BehaviorSubject<string>;
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    // this.indexedDB.clear();
    // window.location.href = environment.hostURL;
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private indexedDB: StorageService,
    private userService: UserService,
    private activityService: ActivityService,
    private storageService: StorageService,
    private NotificationService: NotificationService,
    private masterService: MasterService,
    private jwtService : JwtService
  ) {
    this.tokenSubject = new BehaviorSubject<string | any>(
      localStorage.getItem('token')
    );
  }
  // getExpirationSeconds() {
  //   let expirationTime = sessionStorage.getItem('tokenExpires');
  //   let currentTime = new Date().getTime() / 1000;
  //   console.log('getexpiration time ====>', currentTime);

  //   return Number(expirationTime) - currentTime;
  // }

  // setRefreshTimer(seconds: number) {
  //   if (seconds < 0) seconds = 0;
  //   setTimeout(() => {
  //     this.refeshToken();
  //   }, seconds * 1000);
  // }
  // redirectToLogin(currentURL: string) {
  //   this.storeCurrentLocation(currentURL);
  //   // window.location.href = 'login';
  //   this.router.navigateByUrl('login' )
  // }
  // refeshToken() {

  //   console.log('jwttoken session',  sessionStorage.getItem('token'));
  //   console.log('refreshtoken session ',  sessionStorage.getItem('refresh_token'));

  //   let payload = {
  //     jwtToken: sessionStorage.getItem('token'),
  //     refreshToken:  sessionStorage.getItem('refresh_token')
  //   };
  //   if (this.activityService.userIsActive()) {
  //     this.userService.refreshtoken(payload).subscribe((res: any) => {
  //       console.log('resfresh======>',res);
  //       const userDetail = res;
  //         console.log('token looking =======>', userDetail.jwtToken);
  //         sessionStorage.setItem('token', userDetail.jwtToken);
  //         localStorage.setItem('token', userDetail.jwtToken);
  //         sessionStorage.setItem('refresh_token', userDetail.refreshToken);
  //         this.setExpiration(1000);
  //         return userDetail.jwtToken;

  //     });
  //   }
  //   else {
  //     this.activityService.userResumedSession.pipe(take(1)).subscribe(() => {
  //       this.refeshToken();
  //     });
  //   }
  // }
  // storeCurrentLocation(currentURL: string) {
  //   sessionStorage.setItem('redirectURL', currentURL);
  // }
  getTokens(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
  generateToken(data: any) {
    let payload = {
      "loginId" : data.userName,
      "password" : data.password
    };
    this.userService.userLogin(payload).subscribe((res: any) => {
      const userDetail = res.body;
      console.log(userDetail.success);
      if(userDetail.success) {
        const decodedToken = this.jwtService.decodeToken(res?.body?.result.access_token);
        this.NotificationService.showSuccess('Login Successfully');
        this.storageService.setItem("userDetail", decodedToken)
        if(decodedToken?.roleId == 1) {
          this.router.navigate(["superadmin/school-list"])
        } else if(decodedToken?.roleId == 2) {
          this.router.navigate(["admin/createuser"])
        } else if(decodedToken?.roleId == 3) {
          this.router.navigate(["inquiry/inquiryform"])
        }
        return userDetail  
      } else {
        this.NotificationService.showError('Please check User Id and Password');
      }

      // if (userDetail?.success) {
      //   this.masterService.userbyid(data.email).subscribe((res: any) => {
      //     this.storageService.setItem("userDetail", res.body.result)
      //     const usertype = res.body.result
      //     console.log(usertype,"usertype");
          
      //   // if(usertype[0].user_type.name=="Admin"){
      //   //   this.router.navigate(["admin/createuser"])
      //   // }
      //   // if(usertype[0].user_type.name=="Spare"){
      //   //   this.router.navigate(["spare/add-spare"])
      //   // }
      //   // else{
      //   //   this.router.navigate(["inquiry/inquiryform"])
      //   // }
      //   });
      //   this.NotificationService.showSuccess('Login Successfully');
      //   return userDetail.jwtToken;
      // } else {
      //   this.NotificationService.showError('Please check User Id and Password');
      // }
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }
  // setExpiration(seconds: number) {
  //   if (seconds > 3600) seconds = 3600;
  //   let currentTime = new Date().getTime() / 1000;
  //   console.log('current time======>',currentTime);
  //   sessionStorage.setItem("tokenExpires", (currentTime + seconds).toString());
  //   this.setRefreshTimer(seconds - this.secondsToRefreshBeforeExpiring);
  // }

  hasToken() {
    return localStorage.getItem('token') !== null;
  }

  // tokenIsExpired(): boolean {
  //   let expirationTime = sessionStorage.getItem('tokenExpires');
  //   console.log('expiration time====>', expirationTime);

  //   if (expirationTime === null) return true;
  //   let currentTime = new Date().getTime() / 1000;
  //   return Number(expirationTime) - currentTime < 0;
  // }
}
