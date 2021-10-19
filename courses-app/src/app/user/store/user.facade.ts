import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as UserSelectors from '../store/user.selectors'
import * as UserActions from "./user.actions";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserStateFacade {
  public $name: Observable<string | undefined> = this.store.pipe(select(UserSelectors.getName))
  public $isAdmin: Observable<boolean | undefined> = this.store.pipe(select(UserSelectors.isAdmin))
  public $isLoading: Observable<boolean | undefined> = this.store.pipe(select(UserSelectors.isLoading))
  public $errors: Observable<string[] | undefined> = this.store.pipe(select(UserSelectors.getErrors))
  public $role: Observable<string | undefined> = this.store.pipe(select(UserSelectors.getRole))

  constructor(private store: Store<fromApp.AppState>) {
  }

  getCurrentUser(): void {
    this.store.dispatch(new UserActions.RequestCurrentUserStart())
  }
}
