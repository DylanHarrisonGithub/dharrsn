import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('animationTrigger', [
      transition('true => false', [
        style({ height: '0', fontSize: '0' }),
        animate('100ms ease-in-out')
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {

  navbarCollapsed: boolean = true;
  
  constructor(
    private _userService: UserService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  logout() {
    this._userService.logout();
    if (this._userService.getToken()) {
      this._toastrService.error('Failed to log out', 'Error!');
    } else {
      this._toastrService.success('You are logged out', 'Success!');
    }
  }

}
