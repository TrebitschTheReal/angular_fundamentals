import {Action} from '@ngrx/store';
import {RequestCurrentUserFail} from "../../user/store/user.actions";

export const REQUEST_LOGIN_START = '[Auth] Request Login Start';
export const REQUEST_LOGIN_SUCCESS = '[Auth] Request Login Success';
export const REQUEST_LOGIN_FAIL = '[Auth] Request Login Fail';
export const REQUEST_REGISTER_START = '[Auth] Request Register Start';
export const REQUEST_REGISTER_SUCCESS = '[Auth] Request Register Success';
export const REQUEST_REGISTER_FAIL = '[Auth] Request Register Fail';
export const REQUEST_LOGOUT_START = '[Auth] Request Logout Start';
export const REQUEST_LOGOUT_SUCCESS = '[Auth] Request Logout Success';
export const REQUEST_LOGOUT_FAIL = '[Auth] Request Logout Fail';

export class RequestLoginStart implements Action {
  readonly type = REQUEST_LOGIN_START;

  constructor(public payload: { email: string; password: string }) {
  }
}

export class RequestLoginSuccess implements Action {
  readonly type = REQUEST_LOGIN_SUCCESS;

  constructor(
    public payload: {
      token: string,
    }
  ) {
  }
}

export class RequestLoginFail implements Action {
  readonly type = REQUEST_LOGIN_FAIL;

  constructor(
    public payload: {
      errors: string[]
    }
  ) {
  }
}

export class RequestRegisterStart implements Action {
  readonly type = REQUEST_REGISTER_START;

  constructor(public payload: { name: string, email: string, password: string }) {
  }
}

export class RequestRegisterSuccess implements Action {
  readonly type = REQUEST_REGISTER_SUCCESS;

  constructor(
    public payload: {
      result: string
    }) {
  }
}

export class RequestRegisterFail implements Action {
  readonly type = REQUEST_REGISTER_FAIL;

  constructor(
    public payload: {
      errors: string[]
    }
  ) {
  }
}

export class RequestLogoutStart implements Action {
  readonly type = REQUEST_LOGOUT_START;

  constructor() {
  }
}

export class RequestLogoutSuccess implements Action {
  readonly type = REQUEST_LOGOUT_SUCCESS;

  constructor(
    public payload: {
      result: string
    }) {
  }
}

export class RequestLogoutFail implements Action {
  readonly type = REQUEST_LOGOUT_FAIL;

  constructor(
    public payload: {
      errors: string[]
    }
  ) {
  }
}

export type AuthActions =
  | RequestLoginStart
  | RequestLoginSuccess
  | RequestLoginFail
  | RequestCurrentUserFail
  | RequestRegisterStart
  | RequestRegisterSuccess
  | RequestRegisterFail
  | RequestLogoutStart
  | RequestLogoutSuccess
  | RequestLogoutFail
