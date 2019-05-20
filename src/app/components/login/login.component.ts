import { Component } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({ backgroundColor: 'white', opacity: 1 }))
      ]),
      transition('* => void', [
        animate(2000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('username') un;
  @ViewChild('password') pw;

  private _username: HTMLInputElement;
  private _password: HTMLInputElement;

  constructor(
    private _toastrService: ToastrService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngAfterViewInit() {
    this._username = this.un.nativeElement;
    this._password = this.pw.nativeElement;
  }

  login() {
    this._userService.login({
      username: this._username.value,
      password: this._password.value
    }).subscribe((res) => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success'] === true) {
          this._toastrService.success(res['message'], 'Success!');
          this._router.navigateByUrl('/admin');
        } else {
          this._toastrService.error(res['message'], 'Error!');
        }
      } else {
        this._toastrService.error('Unrecognized response from server.', 'Error!');
      }
      console.log(res);
    }, (err) => {
      this._toastrService.error('An unknown error occured proccessing this request.', 'Error!');
      console.log(err);
    });
  }
  
}
