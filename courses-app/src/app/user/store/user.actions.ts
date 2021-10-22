import {Action} from '@ngrx/store';
import {User} from "../../shared/models/user.model";

export const REQUEST_CURRENT_USER_START = '[User] Request Current User Start';
export const REQUEST_CURRENT_USER_SUCCESS = '[User] Request Current User Success';
export const REQUEST_CURRENT_USER_FAIL = '[User] Request Current User Fail';

export class RequestCurrentUserStart implements Action {
  readonly type = REQUEST_CURRENT_USER_START;

  constructor() {
  }
}

export class RequestCurrentUserFail implements Action {
  readonly type = REQUEST_CURRENT_USER_FAIL;

  constructor(
    public payload: {
      errors: string[];
    }
  ) {
  }
}

export class RequestCurrentUserSuccess implements Action {
  readonly type = REQUEST_CURRENT_USER_SUCCESS;

  constructor(
    public payload: {
      user: User;
    }
  ) {
  }
}

export type UserActions =
  | RequestCurrentUserStart
  | RequestCurrentUserFail
  | RequestCurrentUserSuccess
