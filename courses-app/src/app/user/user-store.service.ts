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
    this.initUserSession();
  }

  public deleteUserSession(): void {
    localStorage.removeItem('userName')
    localStorage.removeItem('userRole')
    this._user$$.next(undefined)
  }

  public getUser(): void {
    console.log('Fetching user')
    this.userService.fetchUser().subscribe(user => {
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userRole', user.role);
      this._user$$.next(user)

      user.role === 'admin' ?
        this._isAdmin$$.next(true) :
        this._isAdmin$$.next(false)
    })
  }

  private initUserSession() {
    let userName: string | null = localStorage.getItem('userName');
    let userRole: string | null = localStorage.getItem('userRole');

    if (!this._user$$.getValue() && userName && userRole) {
      this._user$$.next(new User(
        'dummy',
        'dummy',
        userName,
        'why is this even here',
        userRole
      ))
    }
  }
}
