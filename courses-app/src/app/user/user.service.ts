import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {User} from "../shared/models/user.model";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SessionStorageService} from "../auth/services/session-storage.service";


interface ISignInResponse {
  result: string,
  successful: boolean,
  user: { email: string, name: string }
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {
  }

  public fetchUser(): Observable<User> {
    return this.http
      .get<{ successful: boolean, result: User }>('http://localhost:3000/users/me')
      .pipe(
        map(e => e.result),
        catchError((err: HttpErrorResponse) => {
          return throwError([err.error.error])
        })
      )
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

  public registerUser(user: { name: string, email: string, password: string }): Observable<string> {
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
}
