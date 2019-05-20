import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-img-gallery-card',
  templateUrl: './img-gallery-card.component.html',
  styleUrls: ['./img-gallery-card.component.css']
})
export class ImgGalleryCardComponent implements OnInit {

  @Input() src: string = "";
  @Input() f: Function = (title) => {};
  @Input() title: string = "untitled"
  
  constructor() { }

  ngOnInit() {
  }

}
