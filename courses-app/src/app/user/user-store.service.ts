import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../shared/models/user.model";
import {UserService} from "./user.service";

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

  public deleteUserState(): void {
    this._user$$.next(undefined)
  }

  public getUser(): void {
    console.log('Fetching user')
    this.userService.fetchUser().subscribe({
      next: user => {
        this._user$$.next(user)
        this._isAdmin$$.next(user.role === 'admin')
      },
      error: error => {
        sessionStorage.removeItem('token')
        throw error
      }
    })
  }
}
