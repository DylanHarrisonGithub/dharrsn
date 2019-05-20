import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-img-modal',
  templateUrl: './view-img-modal.component.html',
  styleUrls: ['./view-img-modal.component.css']
})
export class ViewImgModalComponent implements OnInit {

  @Input() src: string = "";

  constructor(
    private _activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  close() {
    this._activeModal.close(null);
  }
}
