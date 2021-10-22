import {AppState} from "../../store/app.reducer";
import {createSelector} from "@ngrx/store";
import {UserState} from "./user.reducer";

export const userState = (state: AppState) => state.user;
export const getName = createSelector(userState, (state: UserState) => state.name)
export const isLoading = createSelector(userState, (state: UserState) => state.isLoading)
export const isAdmin = createSelector(userState, (state: UserState) => state.isAdmin)
export const getErrors = createSelector(userState, (state: UserState) => state.errors)
export const getRole = createSelector(userState, (state: UserState) => state.role)
