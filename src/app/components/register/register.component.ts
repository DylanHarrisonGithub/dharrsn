import { Component } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  @ViewChild('username') un;
  @ViewChild('email') em;
  @ViewChild('password') pw;

  private _username: HTMLInputElement;
  private _email: HTMLInputElement;
  private _password: HTMLInputElement;

  constructor(
    private _toastrService: ToastrService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngAfterViewInit() {
    this._username = this.un.nativeElement;
    this._email = this.em.nativeElement;
    this._password = this.pw.nativeElement;
  }

  register() {
    this._userService.register({
      username: this._username.value,
      email: this._email.value,
      password: this._password.value
    }).subscribe((res) => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success']) {
          this._toastrService.success(res['message'], 'Success!');
          this._router.navigateByUrl('/admin');
        } else {
          this._toastrService.error(res['message'], 'Error!');
          console.log(res['errors']);
        }
      } else {
        this._toastrService.error('Did not recognize response from server', 'Error!');
        console.log(res);
      }
    }, (err) => {
      this._toastrService.error(err, 'Error!');
      console.log(err);
    });
  }

}
