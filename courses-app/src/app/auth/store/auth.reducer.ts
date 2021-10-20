import * as AuthActions from './auth.actions'

export interface AuthState {
  token?: string;
  isAuthorized?: boolean;
  isLoading?: boolean;
  errors?: string[];
  result?: string;
}

const initialState: AuthState = {
  token: undefined,
  isAuthorized: false,
  isLoading: false,
  errors: undefined,
  result: undefined
}

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions.AuthActions
): AuthState {
  switch (action.type) {
    case AuthActions.REQUEST_LOGIN_START:
      return {
        ...state,
        isLoading: true
      };
    case AuthActions.REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isLoading: false
      };
    case AuthActions.REQUEST_LOGIN_FAIL:
      return {
        ...state,
        errors: action.payload.errors,
        isLoading: false
      };
    case AuthActions.REQUEST_REGISTER_START:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActions.REQUEST_REGISTER_SUCCESS:
      return {
        ...state,
        result: action.payload.result,
        isLoading: false
      };
    case AuthActions.REQUEST_REGISTER_FAIL:
      return {
        ...state,
        errors: action.payload.errors,
        isLoading: false
      };
    case AuthActions.REQUEST_LOGOUT_START:
      return {
        ...state,
        isLoading: true
      };
    case AuthActions.REQUEST_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        result: action.payload.result
      };
    case AuthActions.REQUEST_LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
}
