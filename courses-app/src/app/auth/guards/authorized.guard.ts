// import {Injectable} from '@angular/core';
// import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
// import {Observable} from 'rxjs';
// import {AuthService} from "../services/auth.service";
// import {map} from "rxjs/operators";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthorizedGuard implements CanLoad {
//   constructor(private authService: AuthService, private router: Router) {
//
//   }
//
//   canLoad(
//     route: Route,
//     segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     console.log('GUARD????')
//     return this.authService.isAuthorized$.pipe(
//       map((isAuthorized: boolean) => {
//         if (isAuthorized) {
//           console.log('Guard isauthorized')
//           return true;
//         } else {
//           console.log('Guard guarding')
//           this.router.navigate(['/login']);
//           return false;
//         }
//       })
//     )
//   }
// }


import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthorized$.pipe(
      map((isAuthorized: boolean) => {
        if (isAuthorized) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }
}
