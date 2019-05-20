import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ValidatorService } from '../services/validator.service';
import { UserService } from './user.service';

import config from '../../assets/config.json';

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2) })
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _path = config.URI[config.ENVIRONMENT];

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
  ) { }

  // contact services
  getContactMessages() {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "getContactMessages",
      params: {},
      token: this._userService.getToken()
    }));
  }

  deleteContactMessage(id) {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "deleteContactMessage",
      params: {
        id: id
      },
      token: this._userService.getToken()
    }));
  }

  // service services
  createService(service) {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "addService",
      params: service,
      token: this._userService.getToken()
    }));
  }

  updateService(service) {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "updateService",
      params: service,
      token: this._userService.getToken()
    }));
  }

  deleteService(id) {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "deleteService",
      params: { id: id },
      token: this._userService.getToken()
    }));
  }

  // portfolio services
  createPortfolioItem(item) {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "createPortfolioItem",
      params: item,
      token: this._userService.getToken()
    }));
  }

  updatePortfolioItem(item) {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "updatePortfolioItem",
      params: item,
      token: this._userService.getToken()
    }));
  }

  deletePortfolioItem(id) {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "deletePortfolioItem",
      params: { id: id },
      token: this._userService.getToken()
    }));
  }

  // asset services
  uploadPortfolioImg(img: File) {
    const formData: FormData = new FormData();
    formData.append('img', img, img.name);
    formData.append('route', 'uploadPortfolioImg');
    formData.append('params', JSON.stringify([]));
    formData.append('token', JSON.stringify(this._userService.getToken()));
    return this._httpClient.post(this._path + 'interface.php', formData);
  }

  getPortfolioImgList() {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "getPortfolioImgList",
      params: {},
      token: this._userService.getToken()
    }));
  }

  deletePortfolioImg(fname) {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "deletePortfolioImg",
      params: { filename: fname },
      token: this._userService.getToken()
    }));
  }
  
}
