import {ActionReducerMap} from '@ngrx/store';

import * as fromUser from '../user/store/user.reducer'
import * as fromAuth from '../auth/store/auth.reducer'
import {UserEffects} from "../user/store/user.effects";
import {AuthEffects} from "../auth/store/auth.effects";

export interface AppState {
  user: fromUser.UserState;
  auth: fromAuth.AuthState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  user: fromUser.userReducer,
  auth: fromAuth.authReducer
};

export const appEffects = [
  UserEffects,
  AuthEffects
]
