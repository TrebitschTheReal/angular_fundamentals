import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {User} from "../shared/models/user.model";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public fetchUser(): Observable<User> {
    return this.http
      .get<{ successful: boolean, result: User }>('http://localhost:3000/users/me')
      .pipe(
        map(e => e.result)
      )
  }

  //@TODO if no error: switchmap -> get user data
  public signUserIn(user: { email: string, password: string }): Observable<string> {
    return this.http.post('http://localhost:3000/login', user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('pure error: ', error)
          return throwError([error.error.result])
        }),
        map(((next: any) => {
          console.log('pure next: ', next.result)
          return next.result
        }))
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
