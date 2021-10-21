import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import * as AuthActions from '../store/auth.actions';
import * as fromApp from "../../store/app.reducer";
import {AuthService} from "../services/auth.service";
import {UserService} from "../../user/user.service";
import * as UserActions from "./../../user/store/user.actions";
import {Store} from "@ngrx/store";
import {SessionStorageService} from "../services/session-storage.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  // @TODO fix this
  autoLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.REQUEST_AUTO_LOGIN_START),
    switchMap(_ => of(new UserActions.RequestCurrentUserStart())
      .pipe(
        map(action => {
          this.store.dispatch(action)
          this.router.navigate(['/courses'])
          return new AuthActions.RequestAutoLoginSuccess();
        }),
        catchError(error => {
          return of(new AuthActions.RequestAutoLoginFail());
        })
      )
    ))
  );

  login$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.REQUEST_LOGIN_START),
      switchMap((authData: AuthActions.RequestLoginStart) => this.userService.login({
        email: authData.payload.email,
        password: authData.payload.password
      })
        .pipe(
          map((token: string) => {
              this.sessionStorageService.token = token;
              this.store.dispatch(new UserActions.RequestCurrentUserStart())
              this.router.navigate(['/courses'])
              return new AuthActions.RequestLoginSuccess({token: token})
            }
          ),
          catchError((errors: string[]) => {
              console.log(errors)
              return of(new AuthActions.RequestLoginFail({errors: errors}));
            }
          )
        ))
    )
  );

  register$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.REQUEST_REGISTER_START),
      switchMap((authData: AuthActions.RequestRegisterStart) => this.userService.registerUser({
        name: authData.payload.name,
        email: authData.payload.email,
        password: authData.payload.password
      })
        .pipe(
          map((result: string) => {
              console.log(result)
              console.log(result)
              console.log(result)
              console.log(result)
              this.router.navigate(['/courses']);
              this.store.dispatch(new UserActions.RequestCurrentUserStart());
              return new AuthActions.RequestRegisterSuccess({result: result})
            }
          ),
          catchError((result: { successful: boolean, errors: string[] }) => {
              console.log(result.errors);
              console.log(result.errors);
              console.log(result.errors);
              return of(new AuthActions.RequestRegisterFail({errors: result.errors}));
            }
          )
        ))
    )
  );

  logout$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.REQUEST_LOGOUT_START),
      switchMap((_) => this.authService.logout()
        .pipe(
          map((result: string) => {
              console.log(result)
              console.log(result)
              console.log(result)
              console.log(result)
              this.sessionStorageService.deleteToken();
              this.router.navigate(['/login']);
              return new AuthActions.RequestLogoutSuccess({result: 'Logout successful'})
            }
          ),
          catchError((result: { successful: boolean, errors: string[] }) => {
              console.log(result.errors);
              console.log(result.errors);
              console.log(result.errors);
              this.sessionStorageService.deleteToken();
              return of(new AuthActions.RequestLogoutFail({errors: result.errors}));
            }
          )
        ))
    )
  );


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private userService: UserService
  ) {
  }
}
