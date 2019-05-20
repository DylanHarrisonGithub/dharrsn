import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ValidatorService } from '../../../../../services/validator.service'
import __portfolioSchema from '../../../../../../assets/schemas/portfolio';

import config from 'src/assets/config.json';

@Component({
  selector: 'app-portfolio-item-editor',
  templateUrl: './portfolio-item-editor.component.html',
  styleUrls: ['./portfolio-item-editor.component.css']
})
export class PortfolioItemEditorComponent implements OnInit {

  @Input() images = [];
  assetPath = config.ASSETS[config.ENVIRONMENT];
  @Input() portfolioItem = {
    "id": 0,
    "place": 0,
    "title": "",
    "technologies": "",
    "screenshotSrc": this.images[0],
    "bullets": [],
    "links": {
      "source": "",
      "blog": "",
      "website": ""
    }
  };
  @Input() buttons = {
    "submit": {
      "title": "Update",
      "f": (item) => {}
    },
    "cancel": {
      "title": "Cancel",
      "f": (item) => {}
    }
  };
  @Output() portfolioItemChange = new EventEmitter<any>();
  
  private errors = [];
  private _portfolioSchema = __portfolioSchema;
  constructor(
    private _validatorService: ValidatorService
  ) { }

  ngOnInit() {
  }

  hasError(key) {
    let error = false;
    this.errors.forEach(err => { if (err.key === key) { error = true; } });
    return error;
  }

  validate() {
    this.portfolioItemChange.emit(this.portfolioItem);
    this.errors = this._validatorService.validate(this.portfolioItem, this._portfolioSchema);
  }

  formIsClear() {
    let bulletsClear = true;
    this.portfolioItem.bullets.forEach(bullet => { if (bullet) { bulletsClear = false; } })
    return !(this.portfolioItem.title || 
            this.portfolioItem.technologies ||
            this.portfolioItem.screenshotSrc ||
            !bulletsClear ||
            this.portfolioItem.links.source ||
            this.portfolioItem.links.website ||
            this.portfolioItem.links.blog);
  }

  bulletsTrackByFn(index: any, item: any) {
    return index;
  }
}
