import { Component, OnInit } from '@angular/core';

import portfolio from '../../../assets/data/portfolio.json'
import { GuestService } from 'src/app/services/guest.service.js';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import config from 'src/assets/config.json';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  portfolioItems;
  loading = true;
  assetPath = config.ASSETS[config.ENVIRONMENT];
  
  constructor(
    private _guestService: GuestService,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    setTimeout(() => { this.getPortfolioItems(); });
  }

  getPortfolioItems() {
    this._spinnerService.show();
    this.loading = true;
    this._guestService.getPortfolioItems().subscribe(res => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success'] && res['items']) {
          this._spinnerService.hide();
          this.loading = false;
          this.portfolioItems = res['items'];
          //this._toastrService.success(res['message'], 'Success!');
        } else {
          this._spinnerService.hide();
          this.loading = false;
          this._toastrService.error(res['message'], 'Error!');
          this.portfolioItems = portfolio;
        }
      } else {
        this._spinnerService.hide();
        this.loading = false;
        this._toastrService.error('Did not recognize response from server when retrieving portfolio items.', 'Error!');
        console.log(res);
        this.portfolioItems = portfolio;
      }
    }, err => {
      this._toastrService.error('Unknown server error occured while retrieving portfolio items.', 'Error!');
      console.log(err);
      this.portfolioItems = portfolio;
    });
  }

}
