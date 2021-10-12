import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem('token');
    if (token) {
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', token),
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
