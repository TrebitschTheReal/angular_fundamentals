import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {UserService} from "../user/user.service";

@Injectable()

export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem('token');
    let modifiedReq: HttpRequest<any> = req;

    if (token) {
      modifiedReq = req.clone({
        headers: req.headers.set('Authorization', token),
      });
    }

    return next.handle(modifiedReq).pipe(
      catchError(e => {
        console.log('Error from interceptor ', e)
        return throwError(e);
      })
    );

    //@TODO fixme
    // return next.handle(modifiedReq)
    //   .pipe(
    //     catchError((err: any) => {
    //       console.log('This is from the interceptor: ', err)
    //       if (err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403)) {
    //         // @ TODO fixme
    //         // call logout
    //         //this.authService.logout();
    //       }
    //       throw err;
    //     })
    //   );
  }
}
