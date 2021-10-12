import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SessionStorageService} from "./session-storage.service";
import {UserStoreService} from "../../user/user-store.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _authorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isAuthorized$: Observable<boolean> = this._authorized$$.asObservable();
  private readonly _requestBlock$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isRequestBlocked$: Observable<any> = this._requestBlock$$.asObservable();

  constructor(private http: HttpClient,
              private sessionStorageService: SessionStorageService,
              private userStoreService: UserStoreService,
              private router: Router) {
    this.initUserSession();
  }

  login(user: { email: string, password: string }): void {
    if (!this._requestBlock$$.getValue()) {
      this.blockLoginTemporary(3000);
      this.http.post('http://localhost:3000/login', user).subscribe({
        next: (result: any) => {
          sessionStorage.setItem('token', result.result)
          this.sessionStorageService.token = result.result;
          this.userStoreService.getUser();
          this._authorized$$.next(true);
        },
        error: error => {
          throw error;
        }
      })
    }
  }

  logout() {
    this.http.delete('http://localhost:3000/logout').subscribe({
      next: _ => {
        this._authorized$$.next(false);
        this.sessionStorageService.deleteToken();
        this.userStoreService.deleteUserState();
        this.router.navigate(['/login'])
      },
      error: error => {
        throw error;
      }
    })
  }

  register() {

  }

  private initUserSession() {
    let token: string | null = sessionStorage.getItem('token');
    if (token) {
      this.userStoreService.getUser();
      this._authorized$$.next(true);
    } else {
      this._authorized$$.next(false);
    }
  }

  private blockLoginTemporary(blockTime: number): void {
    this._requestBlock$$.next(true);
    setTimeout(() => {
      this._requestBlock$$.next(false)
    }, blockTime)
  }
}
