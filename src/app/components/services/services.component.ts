import { Component, OnInit } from '@angular/core';

import servicesData from '../../../assets/data/services.json';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services = []; //servicesData;
  loading = false;
  constructor(
    private _guestService: GuestService,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._spinnerService.show();
      this.loading = true;
      this._guestService.getServices().subscribe(res => {
        if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
          if (res['success'] && res.hasOwnProperty('services')) {
            this._spinnerService.hide();
            this.loading = false;
            this.services = res['services'];
          } else {
            this._spinnerService.hide();
            this.loading = false;
            this._toastrService.error(res['message'], 'Error!');
            this.services = servicesData;
          }
        } else {
          this._spinnerService.hide();
          this.loading = false;
          this._toastrService.error('Did not recognize response from server', 'Error!');
          this.services = servicesData;
        }
      }, err => {
        this._spinnerService.hide();
        this.loading = false;
        this._toastrService.error('Unknonw server error while retrieving services.', 'Error!');
        this.services = servicesData;
      });
    }, 10);
  }

}
