import * as UserActions from './user.actions'

export interface UserState {
  name?: string;
  role?: string;
  isAdmin?: boolean;
  isLoading?: boolean;
  errors?: string[]
}

const initialState: UserState = {
  name: undefined,
  role: undefined,
  isAdmin: false,
  isLoading: false,
  errors: undefined
}

export function userReducer(
  state: UserState = initialState,
  action: UserActions.UserActions
): UserState {
  switch (action.type) {
    case UserActions.REQUEST_CURRENT_USER_START:
      return {
        ...state,
        isLoading: true
      };
    case UserActions.REQUEST_CURRENT_USER_FAIL:
      return {
        ...state,
        errors: action.payload.errors,
        isLoading: false
      };
    case UserActions.REQUEST_CURRENT_USER_SUCCESS:
      return {
        ...state,
        name: action.payload.user.name,
        role: action.payload.user.role,
        isAdmin: action.payload.user.role === 'admin',
        isLoading: false
      }
    default:
      return state;
  }
}
