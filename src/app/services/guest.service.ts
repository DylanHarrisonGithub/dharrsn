import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import config from '../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private _path = config.URI[config.ENVIRONMENT];

  constructor(
    private _httpClient: HttpClient
  ) { }

  submitContactMessage(contact) {
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "submitContactMessage",
      params: contact
    }));
  }

  getServices() { 
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "getServices",
      params: []
    })).pipe(map(res => {
      if (res.hasOwnProperty('services')) {
        (<Array<any>> res['services']).sort((a, b) => a['place'] - b['place']);
        (<Array<any>> res['services']).forEach(service => { 
          service['place'] = parseInt(service['place']);
          service['errors'] = [];
        });
      }
      return res;
    })); 
  }

  getPortfolioItems() { 
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "getPortfolioItems",
      params: []
    })).pipe(map(res => {
      if (res.hasOwnProperty('items')) {
        (<Array<any>> res['items']).sort((a, b) => parseInt(a['place']) - parseInt(b['place']));
        (<Array<any>> res['items']).forEach(item => { 
          item['place'] = parseInt(item['place']);
        });
      }
      return res;
    })); 
  }

  getBlog() { 
    return this._httpClient.post(this._path + 'interface.php', JSON.stringify({
      route: "getBlog",
      params: []
    })).pipe(map(res => {
      if (res.hasOwnProperty('blog')) {
        (<Array<any>> res['blog']).sort((a, b) => a['place'] - b['place']);
      }
      return res;
    })); 
  }

}