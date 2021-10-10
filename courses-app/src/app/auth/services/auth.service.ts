import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isAuthorized$$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public readonly isAuthorized$: Observable<any> = this.isAuthorized$$.asObservable();

  constructor(private http: HttpClient) {
  }

  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post('http://localhost:3000/login', user)
  }

  logout() {

  }

  register() {

  }
}
