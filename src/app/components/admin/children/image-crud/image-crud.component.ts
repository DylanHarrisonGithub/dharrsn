import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import config from 'src/assets/config.json';

@Component({
  selector: 'app-image-crud',
  templateUrl: './image-crud.component.html',
  styleUrls: ['./image-crud.component.css']
})
export class ImageCrudComponent implements OnInit {

  portfolioImgList = [];
  loading =  false;
  assetPath = config.ASSETS[config.ENVIRONMENT];
  deletePortfolioImg = (fname) => {
    this._adminService.deletePortfolioImg(fname).subscribe(res => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success']) {
          this._toastrService.success(res['message'], 'Success!');
          this.getPortfolioImgList();
        } else {
          this._toastrService.error(res['message'], 'Error!');
        }
      } else {
        this._toastrService.error('Did not recognize response from server.', 'Error!');
        console.log(res);
      }
    }, err => {
      this._toastrService.error('Unknown server error deleting portfolio image.', 'Error!');
      console.log(err);
    });
  };

  constructor(
    private _adminService: AdminService,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    setTimeout(() => { this.getPortfolioImgList(); });
  }

  getPortfolioImgList() {
    this.loading = true;
    this._spinnerService.show();
    this._adminService.getPortfolioImgList().subscribe(res => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success'] && res['list']) {
          this._spinnerService.hide();
          this.loading = false;
          this.portfolioImgList = res['list'];
          //this._toastrService.success(res['message'], 'Success!');
          console.log(res);
        } else {
          this._spinnerService.hide();
          this.loading = false;
          this._toastrService.error(res['message'], 'Error!');
        }
      } else {
        this._spinnerService.hide();
        this.loading = false;
        this._toastrService.error('Did not recognize response from server when retrieving portfolio image list.', 'Error!');
        console.log(res);
      }
    }, err => {
      this._spinnerService.hide();
      this.loading = false;
      this._toastrService.error('Unknown server error occured while retrieving portfolio image list.', 'Error!');
      console.log(err);
    })
  }

  onFileChange(files: FileList) {
    this._adminService.uploadPortfolioImg(files.item(0)).subscribe(res => {
      console.log(res);
      this.getPortfolioImgList();
    }, err => console.log(err));
  }

}
