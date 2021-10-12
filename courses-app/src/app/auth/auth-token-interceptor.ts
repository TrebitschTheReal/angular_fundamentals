import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from "rxjs/operators";
import {AuthService} from "./services/auth.service";

@Injectable()

export class AuthTokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem('token');
    let modifiedReq: HttpRequest<any> = req;

    if (token) {
      modifiedReq = req.clone({
        headers: req.headers.set('Authorization', token),
      });
    }
    return next.handle(modifiedReq)
      .pipe(
        catchError((err: any) => {
          console.log(err)
          if (err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403)) {
            // @ TODO fixme
            // call logout
            //this.authService.logout();
          }
          throw err;
        })
      );
  }
}
