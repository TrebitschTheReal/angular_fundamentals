import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ResultMessage} from "../../shared/models/result-message-model";
import {catchError, map} from "rxjs/operators";

interface ISignInResponse {
  result: string,
  successful: boolean,
  user: { email: string, name: string }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _authorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isAuthorized$: Observable<boolean> = this._authorized$$.asObservable();
  private readonly _resultMessage$$: BehaviorSubject<ResultMessage> = new BehaviorSubject<ResultMessage>(new ResultMessage());
  public readonly resultMessage$: Observable<ResultMessage> = this._resultMessage$$.asObservable();

  private readonly _loading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this._loading$$.asObservable();

  constructor(private http: HttpClient) {
  }

  public login(user: { email: string, password: string }): Observable<string> {
    return this.http.post<ISignInResponse>('http://localhost:3000/login', user)
      .pipe(
        map((result: ISignInResponse) => {
          return result.result;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError([error.error.error])
        }),
      )
  }

  public register(user: { name: string, email: string, password: string }): Observable<string> {
    return this.http
      .post<{ successful: boolean, result: string }>('http://localhost:3000/register', user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('pure error: ', error.error)
          return throwError(error.error)
        }),
        map(((next: any) => {
          console.log('pure next: ', next)
          return next.result
        }))
      )
  }

  logout(withMessage?: boolean): Observable<any> {
    return this.http.delete('http://localhost:3000/logout')
  }
}
