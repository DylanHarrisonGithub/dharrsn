import { Component, OnInit } from '@angular/core';

import { ValidatorService } from 'src/app/services/validator.service';
import { GuestService } from 'src/app/services/guest.service';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';

import __serviceSchema from '../../../../../assets/schemas/service';

@Component({
  selector: 'app-service-crud',
  templateUrl: './service-crud.component.html',
  styleUrls: ['./service-crud.component.css']
})
export class ServiceCrudComponent implements OnInit {

  private _serviceSchema = __serviceSchema;
  services = [];
  editingServices = [];
  newService = {
    'errors': [],
    'place': null,
    'title': "New Service",
    'text': "Service text..",
    'icons': [ "", "", "" ]
  };

  constructor(
    private _validatorService: ValidatorService,
    private _guestService: GuestService,
    private _adminService: AdminService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getServices();
  }

  getServices() {
    this.services = [];
    this._guestService.getServices().subscribe(res => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res.hasOwnProperty('services') && res['success']) {
          this.services = res['services'];
          //this._toastrService.success(res['message'], 'Success!');
          //console.log(this.services);
        } else {
          this._toastrService.error(res['message'], 'Error!');
        }
      } else {
        this._toastrService.error('Unrecognized server response while retrieving services.', 'Error!');
        console.log(res);
      }
    }, err => {
      this._toastrService.error('An Error occured retrieving contact services.', 'Error!');
      console.log(err);
    });
  }

  validateService(service) {

    let newService = {
      'place': 1,
      'title': service.title,
      'text': service.text,
      'icons': []
    }
    if (service.icons[0]) { newService.icons.push(service.icons[0]); }
    if (service.icons[1]) { newService.icons.push(service.icons[1]); }
    if (service.icons[2]) { newService.icons.push(service.icons[2]); }

    service.errors = this._validatorService.validate(newService, this._serviceSchema);
  }

  clearService(service) {
    service['title'] = "",
    service['text'] = "",
    service['icons'] = ["", "", ""];
  }

  createService() {
    let place = 0;
    if (this.services.length) {
      place = this.services[this.services.length -1]['place'] + 1;
    }
    let newService = {
      'place': place,
      'title': this.newService.title,
      'text': this.newService.text,
      'icons': []
    }
    if (this.newService.icons[0]) { newService.icons.push(this.newService.icons[0]); }
    if (this.newService.icons[1]) { newService.icons.push(this.newService.icons[1]); }
    if (this.newService.icons[2]) { newService.icons.push(this.newService.icons[2]); }

    this._adminService.createService(newService).subscribe(res => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success']) {
          this._toastrService.success(res['message'], 'Success!');
          this.getServices();
        } else {
          this._toastrService.error(res['message'], 'Error!');
          console.log(res);
        }
      } else {
        this._toastrService.error('Unrecognized server response while creating service.', 'Error!');
        console.log(res);  
      }
    }, err => {
      this._toastrService.error('An Error occured creating service.', 'Error!');
      console.log(err);
    });
  }

  deleteService(id) {
    this._adminService.deleteService(parseInt(id)).subscribe(res => {
      if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
        if (res['success']) {
          this._toastrService.success(res['message'], 'Success!');
          this.getServices();
        } else {
          this._toastrService.error(res['message'], 'Error!');
          console.log(res);
        }
      } else {
        this._toastrService.error('Unrecognized server response while deleting service.', 'Error!');
        console.log(res);
      }
    }, err => {
      this._toastrService.error('An Error occured deleting service.', 'Error!');
      console.log(err);
    });
  }

  editService(id) {
    let index = -1;
    this.editingServices.forEach(service => { if (service['id'] === id) { index = this.editingServices.indexOf(service) } });
    if (index === -1) {
      let index2 = -1;
      this.services.forEach(service => { if (service['id'] === id) { index2 = this.services.indexOf(service) } });
      if (index2 > -1) {
        this.editingServices.push({
          'id': id,
          'errors': [],
          'place': this.services[index2]['place'],
          'title': this.services[index2]['title'],
          'text': this.services[index2]['text'],
          'icons': [
            this.services[index2]['icons'][0],
            this.services[index2]['icons'][1],
            this.services[index2]['icons'][2],
          ]
        });
      }
    } else {
      this.cancelServiceUpdate(this.editingServices[index]);
    }
  }

  updateService(service) {
    let index = -1;
    this.services.forEach(s => { if (s['id'] == service['id']) { index = this.services.indexOf(s) } });
    if (index > -1) {
      let updatedService = { 
        'id': parseInt(service['id']),
        'icons': []
      };
      if ( this.services[index].title !== service.title) { updatedService['title'] = this.services[index].title }
      if ( this.services[index].text !== service.text) { updatedService['text'] = this.services[index].text }
      
      if (this.services[index].icons[0]) { updatedService.icons.push(this.services[index].icons[0]); }
      if (this.services[index].icons[1]) { updatedService.icons.push(this.services[index].icons[1]); }
      if (this.services[index].icons[2]) { updatedService.icons.push(this.services[index].icons[2]); }

      this._adminService.updateService(updatedService).subscribe(res => {
        if (res.hasOwnProperty('success') && res.hasOwnProperty('message')) {
          if (res['success']) {
            this._toastrService.success(res['message'], 'Success!');
            this.cancelServiceUpdate(service);
            this.getServices();
          } else {
            this._toastrService.error(res['message'], 'Error!');
            console.log(res);
          }
        } else {
          this._toastrService.error('Unrecognized server response while updating service.', 'Error!');
          console.log(res);
        }
      }, err => {
        this._toastrService.error('An Error occured updating service.', 'Error!');
        console.log(err);
      });
    }
  }

  cancelServiceUpdate(service) {
    let index = -1;
    this.services.forEach(s => { if (s['id'] == service['id']) { index = this.services.indexOf(s) } });
    if (index > -1) {
      this.services[index].errors = [],
      this.services[index].title = service.title,
      this.services[index].text = service.text,
      this.services[index].icons[0] = service.icons[0],
      this.services[index].icons[1] = service.icons[1],
      this.services[index].icons[2] = service.icons[2],
      this.editingServices.splice(this.editingServices.indexOf(service), 1);
    }
  }

  getEditingService(id) {
    let index = -1;
    this.editingServices.forEach(service => { if (service['id'] === id) { index = this.editingServices.indexOf(service) } });
    if (index > -1) {
      return this.editingServices[index];
    } else {
      return null;
    }
  }

  moveServiceUp(id) {
    let index = -1;
    this.services.forEach(service => { if (service['id'] === id) { index = this.services.indexOf(service) } });
    if (index > 0) {
      //lazy
      this._adminService.updateService({ 
        id: parseInt(this.services[index]['id']),
        place: this.services[index-1]['place']
      }).subscribe(res => {
        this._adminService.updateService({ 
          id: parseInt(this.services[index-1]['id']),
          place: this.services[index]['place']
        }).subscribe(res => {
          this.getServices();
        }, err => {});
      }, err => {});
    }
  }

  moveServiceDown(id) {
    let index = -1;
    this.services.forEach(service => { if (service['id'] === id) { index = this.services.indexOf(service) } });
    if ((index > -1) && (index < this.services.length-1)) {
      //lazy
      this._adminService.updateService({ 
        id: parseInt(this.services[index]['id']),
        place: this.services[index+1]['place']
      }).subscribe(res => {
        this._adminService.updateService({ 
          id: parseInt(this.services[index+1]['id']),
          place: this.services[index]['place']
        }).subscribe(res => {
          this.getServices();
        }, err => {});
      }, err => {});
    }
  }

}
