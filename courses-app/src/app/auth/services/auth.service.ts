import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SessionStorageService} from "./session-storage.service";
import {UserStoreService} from "../../user/user-store.service";
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";
import {ResultMessage} from "../../shared/models/result-message-model";
import {finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _authorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isAuthorized$: Observable<boolean> = this._authorized$$.asObservable();
  private readonly _resultMessage$$: BehaviorSubject<ResultMessage> = new BehaviorSubject<ResultMessage>(new ResultMessage());
  public readonly resultMessage$: Observable<ResultMessage> = this._resultMessage$$.asObservable();

  private readonly _loading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this._loading$$.asObservable();

  constructor(private http: HttpClient,
              private sessionStorageService: SessionStorageService,
              private userStoreService: UserStoreService,
              private userService: UserService,
              private router: Router) {
    this.initUserSession();
  }

  login(user: { email: string, password: string }): void {
    this._loading$$.next(true);

    this.userStoreService.signInAndSetUserSession(user)
      .subscribe({
        next: (resultLoginPack: any) => {
          console.log('Result loginPack in auth service: ', resultLoginPack)
          this._authorized$$.next(true);
          this._resultMessage$$.next(new ResultMessage(true, ['Login success']))
          this._loading$$.next(false);
        },
        error: err => {
          console.log('Error login at subscribe - auth-service', err)
          this._resultMessage$$.next(new ResultMessage(false, err))
          this._loading$$.next(false);
        }
      })
  }

  logout(withMessage?: boolean) {
    this._loading$$.next(true);

    this._authorized$$.next(false);
    this.userStoreService.deleteUserState();
    this.router.navigate(['/login'])

    this.http.delete('http://localhost:3000/logout').pipe(
      finalize(() => {
        this.sessionStorageService.deleteToken();
        if (withMessage) {
          this._resultMessage$$.next(new ResultMessage(true, ['Logout successful']))
        }
        this._loading$$.next(false);
      })
    ).subscribe()
  }

  register(user: { name: string, email: string, password: string }): void {
    this._loading$$.next(true);

    // @TODO refactor to this ->
    // this.userService.registerUser(user).subscribe((result: ResultMessage) => {
    //   this._resultMessage$$.next(new ResultMessage(result.successful, result.messages))
    //   this._loading$$.next(false);
    // })

    this.userService.registerUser(user).subscribe({
      next: success => {
        console.log(success)
        this._resultMessage$$.next(new ResultMessage(true, [success]))
        this._loading$$.next(false);
      },
      error: err => {
        console.log(err)
        this._resultMessage$$.next(new ResultMessage(false, err.errors))
        this._loading$$.next(false);
      }
    })
  }

  private initUserSession() {
    let token: string | null = sessionStorage.getItem('token');
    if (token) {
      this.userStoreService.setUserSession().subscribe({
        next: () => {
          this._authorized$$.next(true);
        },
        error: (error) => {
          console.log(error)
          this._resultMessage$$.next(new ResultMessage(false, error.errors))
        },
      })
    }
  }
}
