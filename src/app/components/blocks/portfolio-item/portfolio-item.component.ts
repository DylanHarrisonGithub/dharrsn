import { Component, OnInit, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ViewImgModalComponent } from '../view-img-modal/view-img-modal.component';

import config from 'src/assets/config.json';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent implements OnInit {

  assetPath = config.ASSETS[config.ENVIRONMENT];
  @Input() portfolioItem = {
    "id": -1,
    "place": -1,
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

  constructor(
    private _modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  viewImg(src) {
    let viewImgModal = this._modalService.open(ViewImgModalComponent, { size: 'lg' });
    viewImgModal.componentInstance.src = src;
    viewImgModal.result.then(val => {}, err => {});
  }

}
