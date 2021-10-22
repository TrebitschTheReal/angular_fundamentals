import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import {AuthService} from "../services/auth.service";
import {UserService} from "../../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.fetchUser()
      .pipe(
        catchError((error: any) => {
          throwError(error)
          this.authService.logout(false);
          this.router.navigate(['/login'])
          return of(false)
        }),
        map(success => {
          return true
        })
      )
  }


  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }


  //@TODO - Fixme
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthorized$.pipe(
      map((isAuthorized: boolean) => {
        if (isAuthorized) {
          console.log('Guard: authorized')
          return true;
        } else {
          console.log('Guard is guarding')
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }
}
