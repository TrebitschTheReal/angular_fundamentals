import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserService} from "../user.service";
import * as UserActions from "./user.actions";
import {User} from "../../shared/models/user.model";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";

@Injectable()
export class UserEffects {
  fetchUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.REQUEST_CURRENT_USER_START),
      switchMap(() => this.userService.fetchUser()
        .pipe(
          map((user: User) => new UserActions.RequestCurrentUserSuccess({user: user})),
          catchError((errors: string[]) => {
              return of(new UserActions.RequestCurrentUserFail({errors: errors}));
            }
          )
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private userService: UserService
  ) {
  }
}
