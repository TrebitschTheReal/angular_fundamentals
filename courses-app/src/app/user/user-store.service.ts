import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {User} from "../shared/models/user.model";
import {UserService} from "./user.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private readonly _user$$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  public readonly user$: Observable<User | undefined> = this._user$$.asObservable()
  private readonly _isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isAdmin$: Observable<boolean> = this._isAdmin$$.asObservable();

  constructor(private userService: UserService) {
  }

  set user(user: User) {
    this._user$$.next(user)
    this._isAdmin$$.next(user.role === 'admin')
  }

  public deleteUserState(): void {
    this._user$$.next(undefined)
  }

  public setUserSession(): Observable<boolean> {
    return this.userService.fetchUser()
      .pipe(
        catchError(error => {
          console.log('Error in set user session process: user-store-service')
          return throwError([error.error.result])
        }),
        map((user: User) => {
          this.user = user;
          return true
        })
      )
  }

  public signInAndSetUserSession(user: { email: string, password: string }): Observable<object> {
    console.log('Fetching user')
    return this.userService.signUserIn(user)
      .pipe(
        catchError(error => {
          console.log('Error in login process: user-store-service')
          return throwError([error.error.result])
        }),
        map((resultLoginPack: any) => {
          console.log('Result loginPack in user-store service: ', resultLoginPack)
          this.user = resultLoginPack.user;
          return resultLoginPack;
        }),
      )
  }
}
