import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../../../services/admin.service';
import { GuestService } from '../../../../services/guest.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import config from 'src/assets/config.json';

@Component({
  selector: 'app-portfolio-crud',
  templateUrl: './portfolio-crud.component.html',
  styleUrls: ['./portfolio-crud.component.css']
})
export class PortfolioCrudComponent implements OnInit {

  assetPath = config.ASSETS[config.ENVIRONMENT];
  portfolioItems = [];
  editingItems = [];
  newPortfolioItem = {
    "title": "New Portfolio Item",
    "technologies": "Technologies..",
    "screenshotSrc": "https://dylanharrisongithub.github.io/images/rpgparty.png",
    "bullets": [
      "bullet 1..",
      "bullet 2.."
    ],
    "links": {
      "source": "https://github.com/DylanHarrisonGithub",
      "blog": "",
      "website": ""
    }
  };
  images = [];
  newPortfolioItemButtons = {
    "submit": {
      "title": "Create",
      "f": (item) => {
        let place = 0;
        if (this.portfolioItems.length) {
          place = parseInt(this.portfolioItems[this.portfolioItems.length-1]['place']) + 1;
        }
        this.createPortfolioItem({
          "place": place,
          "title": item.title,
          "technologies": item.technologies,
          "screenshotSrc": item.screenshotSrc,
          "bullets": item.bullets,
          "links": item.links
        });
      }
    },
    "cancel": {
      "title": "Clear",
      "f": (item) => {
        this.newPortfolioItem = {
          "title": "",
          "technologies": "",
          "screenshotSrc": "",
          "bullets": [],
          "links": {
            "source": "",
            "blog": "",
            "website": ""
          }
        };
      }
    }
  };
  editPortfolioItemButtons = {
    "submit": {
      "title": "Update",
      "f": (item) => {
        this.updatePortfolioItem(item);
      }
    },
    "cancel": {
      "title": "Cancel",
      "f": (item) => {
        this.cancelItemEdit(item.id);
      }
    }
  };
  loading = false;

  constructor(
    private _guestService: GuestService,
    private _adminService: AdminService,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    setTimeout(() => { this.getPortfolioItems(); });
    this._adminService.getPortfolioImgList().subscribe(res => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success'] && res['list']) {
          this.images = res['list'];
        } 
      }
    }, err => {});
  }

  getPortfolioItems() {
    this.loading = true;
    this._spinnerService.show();
    this._guestService.getPortfolioItems().subscribe(res => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success'] && res['items']) {
          this._spinnerService.hide();
          this.loading = false;
          this.portfolioItems = res['items'];
          //this._toastrService.success(res['message'], 'Success!');
          //console.log(res);
        } else {
          this._spinnerService.hide();
          this.loading = false;
          this._toastrService.error(res['message'], 'Error!');
        }
      } else {
        this._spinnerService.hide();
        this.loading = false;
        this._toastrService.error('Did not recognize response from server when retrieving portfolio items.', 'Error!');
        console.log(res);
      }
    }, err => {
      this._spinnerService.hide();
      this.loading = false;
      this._toastrService.error('Unknown server error occured while retrieving portfolio items.', 'Error!');
      console.log(err);
    });
  }
  createPortfolioItem(item) {
    this._adminService.createPortfolioItem(item).subscribe(res => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success']) {
          this._toastrService.success(res['message'], 'Success!');
          this.getPortfolioItems();
        } else {
          this._toastrService.error(res['message'], 'Error!');
          console.log(res);
        }
      } else {
        this._toastrService.error('Did not recognize response from server when retrieving portfolio items.', 'Error!');
        console.log(res);
      }
    }, err => {
      this._toastrService.error('Unknown server error occured while creating portfolio item.', 'Error!');
      console.log(err);
    });
  }
  deletePortfolioItem(id) {
    this._adminService.deletePortfolioItem(parseInt(id)).subscribe(res => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success']) {
          this._toastrService.success(res['message'], 'Success!');
          this.getPortfolioItems();
        } else {
          this._toastrService.error(res['message'], 'Error!');
          this.getPortfolioItems();
          console.log(res);
        }
      } else {
        this._toastrService.error('Did not recognize response from server while deleting portfolio item.', 'Error!');
        this.getPortfolioItems();
        console.log(res);
      }
    }, err => {
      this._toastrService.error('Unknown server error occured while deleting portfolio item.', 'Error!');
      console.log(err);
    });
  }
  updatePortfolioItem(item) {
    let editingItem = this.getEditingItem(item.id);
    if (editingItem) {
      let updatedItem = { id: parseInt(item.id) };
      if ( editingItem.title !== item.title ) { updatedItem['title'] = item.title }
      if ( editingItem.technologies !== item.technologies ) { updatedItem['technologies'] = item.technologies }
      if ( editingItem.screenshotSrc !== item.screenshotSrc ) { updatedItem['screenshotSrc'] = item.screenshotSrc }
      if ( JSON.stringify(editingItem.bullets) !== JSON.stringify(item.bullets) ) { updatedItem['bullets'] = item.bullets }
      if ( JSON.stringify(editingItem.links) !== JSON.stringify(item.links) ) { updatedItem['links'] = item.links }
      this._adminService.updatePortfolioItem(updatedItem).subscribe(res => {
        if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
          if (res['success']) {
            this._toastrService.success(res['message'], 'Success!');
            this.cancelItemEdit(item.id);
            this.getPortfolioItems();
          } else {
            this._toastrService.error(res['message'], 'Error!');
            this.getPortfolioItems();
            console.log(res);
          }
        } else {
          this._toastrService.error('Did not recognize response from server while updating portfolio item.', 'Error!');
          this.getPortfolioItems();
          console.log(res);
        }
      }, err => {
        this._toastrService.error('Unknown server error occured while updating portfolio item.', 'Error!');
        console.log(err);
      });
    }
  }
  moveItemUp(id) {
    let item = this.getPortfolioItemById(id);
    let index = this.portfolioItems.indexOf(item);
    if (index > 0) {
      this._adminService.updatePortfolioItem({
        id: parseInt(id),
        place: this.portfolioItems[index-1]['place']
      }).subscribe(res => {
        this._adminService.updatePortfolioItem({
          id: parseInt(this.portfolioItems[index-1]['id']),
          place: this.portfolioItems[index]['place']
        }).subscribe(res => {
          this.getPortfolioItems();
        }, err => {});
      }, err => {});
    }
  }
  moveItemDown(id) {
    let item = this.getPortfolioItemById(id);
    let index = this.portfolioItems.indexOf(item);
    if ((index > -1) && (index < this.portfolioItems.length-1)) {
      this._adminService.updatePortfolioItem({
        id: this.portfolioItems[index]['id'],
        place: this.portfolioItems[index+1]['place']
      }).subscribe(res => {
        this._adminService.updatePortfolioItem({
          id: parseInt(this.portfolioItems[index+1]['id']),
          place: this.portfolioItems[index]['place']
        }).subscribe(res => {
          this.getPortfolioItems();
        }, err => {});
      }, err => {});
    }
  }

  editItem(id) {
    let item = this.getEditingItem(id);
    if (item) {
      this.cancelItemEdit(id);
    } else {
      item = this.getPortfolioItemById(id);
      if (item) {
        this.editingItems.push(JSON.parse(JSON.stringify(item)));
      }
    }
  }

  getPortfolioItemById(id) {
    let index = -1;
    this.portfolioItems.forEach(item => { 
      if (item['id'] === id) { 
        index = this.portfolioItems.indexOf(item) 
      } 
    });
    if (index > -1) {
      return this.portfolioItems[index];
    } else {
      return null;
    }   
  }
  getEditingItem(id) {
    let index = -1;
    this.editingItems.forEach(item => { 
      if (item['id'] === id) { 
        index = this.editingItems.indexOf(item) 
      } 
    });
    if (index > -1) {
      return this.editingItems[index];
    } else {
      return null;
    }
  }

  cancelItemEdit(id) {
    let portfolioItem = this.getPortfolioItemById(id);
    let editingItem = this.getEditingItem(id);
    if (portfolioItem && editingItem) {
      this.portfolioItems[this.portfolioItems.indexOf(portfolioItem)] = JSON.parse(JSON.stringify(editingItem));
    }
    if (editingItem) { 
      this.editingItems.splice(this.editingItems.indexOf(editingItem), 1); 
    }
  }
}
