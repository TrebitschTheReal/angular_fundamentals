import {Injectable} from '@angular/core';
import {forkJoin, Observable, of, throwError} from "rxjs";
import {User} from "../shared/models/user.model";
import {catchError, map, switchMap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SessionStorageService} from "../auth/services/session-storage.service";

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
        map(e => e.result)
      )
  }

  public signUserIn(user: { email: string, password: string }): Observable<object> {
    return this.http.post('http://localhost:3000/login', user)
      .pipe(
        // At login, we want to log in the user, fetch the token, then immediately fetch the user data too
        // because we need the current user info (role, name etc)
        // so it may be a good solution to do this call with side effects -> save token
        switchMap((login: any) =>
          forkJoin({
            // Login runs first, and when it's arrived, we set the retrieved token to the sessionstorage
            token: of(login).pipe(map(data => {
              console.log(data)
              this.sessionStorageService.token = data.result;
              return data.result
            })),
            // With the token, now we can fetch the user data too
            user: this.fetchUser()
          }).pipe(
            map(resultPack => {
              // We sending back the whole login pack
              return resultPack;
            })
          )
        )
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
