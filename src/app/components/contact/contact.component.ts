import { Component, OnInit } from '@angular/core';

import { GuestService } from '../../services/guest.service';
import { ValidatorService } from '../../services/validator.service';

import { ToastrService } from 'ngx-toastr';

import __contactSchema from '../../../assets/schemas/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  alerts = [];

  private _contactSchema = __contactSchema;

  contact = {
    name: "",
    email: "",
    message: ""
  };

  constructor(
    private _toastrService: ToastrService,
    private _guestService: GuestService,
    private _validatorService: ValidatorService
  ) { }

  ngOnInit() {
  }

  validate() {
    this.alerts = this._validatorService.validate(this.contact, this._contactSchema);
  }

  hasError(key) {
    let error = false;
    this.alerts.forEach(err => { if (err.key === key) { error = true; } });
    return error;
  }

  submit() {
    this._guestService.submitContactMessage(this.contact).subscribe(res => {
      console.log(res);
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success']) {
          this._toastrService.success('Your message has been recieved. Please be patient for my response.', 'Success!');
        } else {
          this._toastrService.error(res['message'], 'Error!');
          console.log(res['errors']);
        }
      } else {
        this._toastrService.error('Unrecognized server response.', 'Error!');
        console.log(res);
      }
    }, err => {
      this._toastrService.error('An error occured submitting your message.', 'Error!');
      console.log(err);
    });
    this.contact.name = "";
    this.contact.email = "";
    this.contact.message = "";
  }

}
