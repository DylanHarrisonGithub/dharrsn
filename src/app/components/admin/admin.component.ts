import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { GuestService } from '../../services/guest.service';
import { ValidatorService } from '../../services/validator.service';

import { ToastrService } from 'ngx-toastr';

import portfolioData from '../../../assets/data/portfolio.json';

import __serviceSchema from '../../../assets/schemas/service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showMessages = false;
  showServices = false;
  showPortfolio = false;
  showBlog =  false;
  showImages = false;

  constructor(
    private _adminService: AdminService
  ) { }

  ngOnInit() {}

}
