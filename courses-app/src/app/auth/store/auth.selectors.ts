import {AppState} from "../../store/app.reducer";
import {createSelector} from "@ngrx/store";
import {AuthState} from "./auth.reducer";

export const authState = (state: AppState) => state.auth;
export const getToken = createSelector(authState, (state: AuthState) => state.token)
export const isAuthorized = createSelector(authState, (state: AuthState) => state.isAuthorized)
export const isLoading = createSelector(authState, (state: AuthState) => state.isLoading)
export const getErrors = createSelector(authState, (state: AuthState) => state.errors)
export const getResult = createSelector(authState, (state: AuthState) => state.result)
