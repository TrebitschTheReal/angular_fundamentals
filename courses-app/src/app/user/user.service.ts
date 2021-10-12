import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../shared/models/user.model";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

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

  public registerUser(user: { name: string, email: string, password: string }): Observable<{ successful: boolean, result: string }> {
    return this.http
      .post<{ successful: boolean, result: string }>('http://localhost:3000/register', user)
  }
}
