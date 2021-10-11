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
      .get<{ successful: boolean, result: User }>(
        'http://localhost:3000/users/me')
      .pipe(
        map(e => e.result)
      )
  }
}
