import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import * as AuthActions from '../store/auth.actions';
import {AuthService} from "../services/auth.service";
import {UserService} from "../../user/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.REQUEST_LOGIN_START),
      switchMap((authData: AuthActions.RequestLoginStart) => this.userService.signUserIn({
        email: authData.payload.email,
        password: authData.payload.password
      })
        .pipe(
          map((resultPack: any) => {
              console.log(resultPack.token)
              console.log(resultPack.token)
              console.log(resultPack.token)
              console.log(resultPack.token)
              return new AuthActions.RequestLoginSuccess({token: resultPack.token})
            }
          ),
          catchError((errors: HttpErrorResponse) => {
              console.log(errors.error.result);
              console.log(errors.error.result);
              console.log(errors.error.result);
              return of(new AuthActions.RequestLoginFail({errors: [errors.error.result]}));
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) {
  }
}
