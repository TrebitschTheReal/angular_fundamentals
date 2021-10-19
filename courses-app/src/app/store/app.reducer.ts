import {ActionReducerMap} from '@ngrx/store';

import * as fromUser from '../user/store/user.reducer'
import {UserEffects} from "../user/store/user.effects";

export interface AppState {
  user: fromUser.UserState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  user: fromUser.userReducer
};

export const appEffects = [
  UserEffects
]
