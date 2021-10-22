import {select, Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as AuthSelectors from './auth.selectors'
import * as AuthActions from './auth.actions'
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {SessionStorageService} from "../services/session-storage.service";
import {UserStateFacade} from "../../user/store/user.facade";

@Injectable({
  providedIn: 'root'
})
export class AuthStateFacade {
  public $token: Observable<string | undefined> = this.store.pipe(select(AuthSelectors.getToken));
  public $isAuthorized: Observable<boolean | undefined> = this.store.pipe(select(AuthSelectors.isAuthorized));
  public $isLoading: Observable<boolean | undefined> = this.store.pipe(select(AuthSelectors.isLoading));
  public $errors: Observable<string[] | undefined> = this.store.pipe(select(AuthSelectors.getErrors));
  public $result: Observable<string | undefined> = this.store.pipe(select(AuthSelectors.getResult));

  constructor(
    private userStateFacade: UserStateFacade,
    private store: Store<fromApp.AppState>,
    private sessionStorageService: SessionStorageService
  ) {
  }

  login(user: { email: string, password: string }): void {
    this.store.dispatch(new AuthActions.RequestLoginStart(user));
  }

  register(user: { name: string, email: string, password: string }): void {
    this.store.dispatch(new AuthActions.RequestRegisterStart(user));
  }

  logout(): void {
    this.store.dispatch(new AuthActions.RequestLogoutStart())
  }

  autoLogin() {
    if (this.sessionStorageService.token) {
      this.store.dispatch(new AuthActions.RequestAutoLoginStart())
    }
  }
}
