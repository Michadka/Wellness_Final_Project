import {  Component,  OnInit,  Input,  ViewChild } from '@angular/core';
import {  DataService } from '../data.service';
import {  NgForm } from '@angular/forms';
import {  ActivatedRoute,  Params } from '@angular/router';
import {  Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-wellnessevent-form',
  templateUrl: './wellnessevent-form.component.html',
  styleUrls: ['./wellnessevent-form.component.css']
})
export class WellnesseventFormComponent implements OnInit {
  events: any[];
  event: object;
  errorMessage: string;
  successMessage: string;

  formErrors = {
    // 'type': '',
    'eventName': '',
    'startDate': '',
    'endDate': '',
    'location': '',
    'description': ''
  };

    // "id": 1,
    // "eventName": "Event1",
    // "startDate": "Date1",
    // "endDate": "Date2",
    // "location": "Indy",
    // "description": "StepsForever",
    // "type": "Community",
    // "members": []

// mySQL
  // type
  // event_name
  // start_date
  // end_date
  // location
  // description

  validationMessages = {
    // 'type': {
    //   'required': 'Event Type is required.'
    // },
    'eventName': {
      'required': 'Event Name is required.',
      'minlength': 'Event Name must be at least 5 characters long.'
    },
    'startDate': {
      'required': 'Start Date is required.'
      // add date format validator
    },
    'endDate': {
      'required': 'End Date is required.'
      // add date format validator
    },
    'location': {
      'required': 'Location is required.',
      'minlength': 'Location must be at least 3 characters long.'
    },
    'description': {
      'required': 'Description is required.',
      'minlength': 'Description must be at least 3 characters long.'
    }
  };

  eventForm: NgForm;
  @ViewChild('eventForm') currentForm: NgForm;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord('event', +params['id']))
      .subscribe(event => this.event = event);
  }

  saveEvent(event: NgForm) {
    console.log('event.value id = ' + event.value.id)
    console.log('event.value type = ' + event.value.type)
    console.log('event.value eventName = ' + event.value.eventName)
    console.log('event.value startDate = ' + event.value.startDate)
    console.log('event.value endDate = ' + event.value.endDate)
    console.log('event.value location = ' + event.value.location)
    console.log('event.value description = ' + event.value.description)
    if (typeof event.value.id === 'number') {
      this.dataService.editRecord('event', event.value, event.value.id)
          .subscribe(
            event => this.successMessage = 'Record updated successfully',
            error =>  this.errorMessage = <any>error);
    }else {
      this.dataService.addRecord('event', event.value)
          .subscribe(
            event => this.successMessage = 'Record added successfully',
            error =>  this.errorMessage = <any>error);
            this.event = {};
    }
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }

  onValueChanged(data ?: any) {
    let form = this.eventForm.form;

    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
