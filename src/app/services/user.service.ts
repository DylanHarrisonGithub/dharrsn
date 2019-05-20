import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import config from '../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _path = config.URI[config.ENVIRONMENT];

  constructor(
    private _httpClient: HttpClient
  ) { }

  register(user) {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "register",
      params: user
    })).pipe(map(u => {
      if (u.hasOwnProperty('token')) {
        sessionStorage.setItem('token', JSON.stringify(u['token']));
      }
      return u;
    }));
  }

  login(user) {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "login",
      params: user
    })).pipe(map(u => {
      if (u.hasOwnProperty('token')) {
        sessionStorage.setItem('token', JSON.stringify(u['token']));
      }
      return u;
    }));
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  getToken() {
    let token = sessionStorage.getItem('token');
    if (token) {
      try {
        return JSON.parse(token);
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }
}
