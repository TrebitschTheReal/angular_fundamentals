import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private readonly _token$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly token$: Observable<string> = this._token$$.asObservable();

  constructor() {
  }

  get token(): string {
    return this._token$$.getValue();
  }

  set token(token: string) {
    this._token$$.next(token);
  }

  refreshToken(): void {

  }

  deleteToken() {
    sessionStorage.removeItem('token')
  }
}
