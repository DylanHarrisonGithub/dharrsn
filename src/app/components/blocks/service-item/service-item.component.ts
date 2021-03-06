import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.css']
})
export class ServiceItemComponent implements OnInit {

  @Input() service = {
    title: "",
    text: "",
    icons: []
  }
  @Input() flip: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
