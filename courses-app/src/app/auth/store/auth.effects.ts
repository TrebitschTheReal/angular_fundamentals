import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, finalize, map, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import * as AuthActions from '../store/auth.actions';
import * as fromApp from "../../store/app.reducer";
import {AuthService} from "../services/auth.service";
import * as UserActions from "./../../user/store/user.actions";
import {Store} from "@ngrx/store";
import {SessionStorageService} from "../services/session-storage.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  autoLogin$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.REQUEST_AUTO_LOGIN_START),
      switchMap((_) => [
        new UserActions.RequestCurrentUserStart(),
        new AuthActions.RequestAutoLoginSuccess(),
      ]),
      tap(_ => {
        this.router.navigate(['/courses'])
      }),
      catchError((errors: string[]) => {
          return of(new AuthActions.RequestLoginFail({errors: errors}));
        }
      ),
    )
  );

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.REQUEST_LOGIN_START),
    switchMap((authData: AuthActions.RequestLoginStart) => this.authService.login({
      email: authData.payload.email,
      password: authData.payload.password
    }).pipe(
      // If success..
      tap((token: string) => {
        this.sessionStorageService.token = token;
      }),
      // We would like to fire multiple actions if the outer (main) action was success
      // no need to use forkJoin here, to get access the inner pipe: we dont even want to access it. Why?
      // we are firing actions: handled requests with a complete choreography -> no need to interfere
      // if we would like to fire a service method (so technically a not registered, not handled "action"),
      // we can use forkJoin, because those result are not handled anywhere yet
      switchMap((token: string) => [
        new UserActions.RequestCurrentUserStart(),
        new AuthActions.RequestLoginSuccess({token: token}),
      ]),
      tap(_ => {
        this.router.navigate(['/courses'])
      }),
      // Else...
      catchError((errors: string[]) => {
          return of(new AuthActions.RequestLoginFail({errors: errors}));
        }
      ),
    ))));

  register$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.REQUEST_REGISTER_START),
    switchMap((authData: AuthActions.RequestRegisterStart) => this.authService.register({
      name: authData.payload.name,
      email: authData.payload.email,
      password: authData.payload.password
    }).pipe(
      // If success..
      tap(_ => this.router.navigate(['/login'])),
      map((result: string) => new AuthActions.RequestRegisterSuccess({result: result})),
      // Else..
      catchError((result: { successful: boolean, errors: string[] }) => {
          return of(new AuthActions.RequestRegisterFail({errors: result.errors}));
        }
      )
    )),
  ));

  logout$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.REQUEST_LOGOUT_START),
      switchMap((_) => this.authService.logout()
        .pipe(
          // No matter the outcome of the request -> we must do things anyway
          // we must reset the token, and force navigate outside the inner pages
          // (the guards will handle the rest)
          finalize(() => {
            this.sessionStorageService.deleteToken();
            this.router.navigate(['/login']);
          }),
          map(_ => new AuthActions.RequestLogoutSuccess({result: 'Logout successful'})),
          catchError((result: { successful: boolean, errors: string[] }) => {
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
  ) {
  }
}
