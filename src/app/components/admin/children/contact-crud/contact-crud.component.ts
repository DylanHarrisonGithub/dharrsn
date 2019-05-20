import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-crud',
  templateUrl: './contact-crud.component.html',
  styleUrls: ['./contact-crud.component.css']
})
export class ContactCrudComponent implements OnInit {

  messages = [];

  constructor(
    private _guestService: GuestService,
    private _adminService: AdminService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getContactMessages();
  }

  getContactMessages() {
    this.messages = [];
    this._adminService.getContactMessages().subscribe(res => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res.hasOwnProperty('messages') && res['success']) {
          this.messages = res['messages'];
          //this._toastrService.success(res['message'], 'Success!');
        } else {
          this._toastrService.error(res['message'], 'Error!');
          console.log(res);
        }
      } else {
        this._toastrService.error('Unrecognized server response while retrieving messages.', 'Error!');
        console.log(res);
      }
    }, err => {
      this._toastrService.error('An Error occured retrieving contact messages.', 'Error!');
      console.log(err);
    });
  }

  deleteContactMessage(id) {
    this._adminService.deleteContactMessage(parseInt(id)).subscribe(res => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success']) {
          this._toastrService.success(res['message'], 'Success!');
          this.getContactMessages();
        } else {
          this._toastrService.error(res['message'], 'Error!');
        }
      } else {
        this._toastrService.error('Unrecognized server response while deleting messages.', 'Error!');
        console.log(res);        
      }
    }, err => {
      this._toastrService.error('An Error occured deleting that contact message.', 'Error!');
      console.log(err);
    });
  }

}
