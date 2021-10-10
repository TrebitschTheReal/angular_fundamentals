import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(private window: Window) {
  }

  setToken(token: string): void {

  }

  getToken() {

  }

  deleteToken() {

  }
}
