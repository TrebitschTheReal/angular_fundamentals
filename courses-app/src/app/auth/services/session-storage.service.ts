import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() {
  }

  get token(): string {
    return sessionStorage.getItem('token') as string;
  }

  set token(token: string) {
    sessionStorage.setItem('token', token)
  }

  refreshToken(): void {

  }

  deleteToken() {
    sessionStorage.removeItem('token')
  }
}
