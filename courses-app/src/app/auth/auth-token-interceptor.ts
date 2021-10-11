import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionStorageService} from "./services/session-storage.service";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private sessionStorageService: SessionStorageService) {
    this.sessionStorageService.token$.subscribe(token => {
      token ? localStorage.setItem('token', token) :
        localStorage.removeItem('token');
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    console.log('Intercept runs')
    if (token) {
      console.log('BEARER TOKEN CALL')
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', token),
      });
      return next.handle(modifiedReq);
    }
    console.log('GUEST CALL')
    return next.handle(req);
  }
}
