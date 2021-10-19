import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserService} from "../user.service";
import * as UserActions from "./user.actions";
import {User} from "../../shared/models/user.model";

@Injectable()
export class UserEffects {
  fetchUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.REQUEST_CURRENT_USER_START),
      switchMap((userData: UserActions.RequestCurrentUserStart) => this.userService.fetchUser()
        .pipe(
          map((user: User) => {
              return new UserActions.RequestCurrentUserSuccess({user: user})
            }
          ),
          catchError((errors: string[]) => {
              return of(new UserActions.RequestCurrentUserFail({errors: errors}));
            }
          )
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
  }
}
