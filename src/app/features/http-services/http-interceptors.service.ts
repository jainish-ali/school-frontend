import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Inject, Injectable, Injector, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { SessionService } from "./session.service";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root",
})
export class HttpInterceptorsService implements HttpInterceptor {
  constructor(private router: Router, private tokenService: TokenService, private sessionService: SessionService) {}
  invalidTokenError(error: HttpErrorResponse): boolean {
    let errorsArray = error.error.errors;
    if (errorsArray === undefined) return false;
    if (
      errorsArray.find((object: any) => object.type === "InvalidTokenError")
    ) {
      return true;
    }
    return false;
  }
  unAuthorizedError(error: HttpErrorResponse): boolean {
    let errorsArray = error.error.errors;
    if (errorsArray === undefined) return false;
    if (
      errorsArray.find((object: any) => object.type === "UnauthorizedError")
    ) {
      return true;
    }
    return false;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.has("InterceptorSkipHeader")) {
      const headers = request.headers.delete("InterceptorSkipHeader");
      return next.handle(request.clone({ headers }));
    }
    if (this.tokenService.hasToken()) {
      return next
        .handle(
          request.clone({
            setHeaders: {
              Authorization: "Bearer " + this.tokenService.getToken(),
            },
          })
        )
        .pipe(
          catchError((error: any) => {
            if (this.invalidTokenError(error)) {
              this.sessionService.redirectToLogin(this.router.url);
            }
            if (this.unAuthorizedError(error)){
              this.sessionService.redirectToLogin(this.router.url);
            }
            // return of(error);
            return throwError(error);
          })
        );
    }
    return next.handle(request);
  }
}
