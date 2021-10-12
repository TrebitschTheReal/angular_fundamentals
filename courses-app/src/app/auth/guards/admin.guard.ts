import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {UserStoreService} from "../../user/user-store.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userStoreService: UserStoreService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userStoreService.isAdmin$.pipe(
      map((isAdmin: boolean) => {
        if (isAdmin) {
          return true;
        } else {
          this.router.navigate(['/courses']);
          return false;
        }
      })
    )
  }
}
