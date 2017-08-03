import {  Component,  OnInit,  Input,  ViewChild } from '@angular/core';
import {  DataService } from '../data.service';
import {  NgForm } from '@angular/forms';
import {  ActivatedRoute,  Params, Router } from '@angular/router';
import {  Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { EventType } from './eventType';

@Component({
  selector: 'app-wellnessevent-form',
  templateUrl: './wellnessevent-form.component.html',
  styleUrls: ['./wellnessevent-form.component.css']
})
export class WellnesseventFormComponent implements OnInit {
  // events: any[];
  wellnessEvent: object = {};
  errorMessage: string;
  successMessage: string;
  eventNum = 4; // used to set the initial event type per received object
  title = '';

  eventTypes = [
    // new EventType(0, 'Please select an event type'),
    new EventType(1, '5K'),
    new EventType(2, '10K'),
    new EventType(3, 'Step Count')
  ]

  formErrors = {
    // 'type': '',
    'eventName': '',
    'startsOn': '',
    'endsOn': '',
    'location': '',
    'description': ''
  };

  validationMessages = {
    // 'type': {
    //   'required': 'Event Type is required.'
    // },
    'eventName': {
      'required': 'Event Name is required.',
      'minlength': 'Event Name must be at least 5 characters long.'
    },
    'startsOn': {
      'required': 'Start Date is required.'
      // add date format validator
    },
    'endsOn': {
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
    private location: Location,
    private router: Router
  ) {}

  getRecordForEdit(id) {
      this.dataService.getRecord('eventbyid', id)
      .subscribe(
        event => {
          this.wellnessEvent = event;
          console.log('In getRecordForEdit');
          console.log(this.wellnessEvent);
          switch (this.wellnessEvent['eventType']) {
            case '5K':
              this.eventNum = 1;
              break;
            case '10K':
              this.eventNum = 2;
              break;
            default:
              this.eventNum = 3;
          }
          console.log('Event Num = ' + this.eventNum);
        });
  }

  saveEvent(event: NgForm) {
    console.log('event.value id = ' + event.value.id);
    console.log('event.value eventType = ' + event.value.eventType);
    console.log('event.value eventName = ' + event.value.eventName);
    console.log('event.value startsOn = ' + event.value.startsOn);
    console.log('event.value endsOn = ' + event.value.endsOn);
    console.log('event.value streetAddress = ' + event.value.streetAddress);
    console.log('event.value city = ' + event.value.city);
    console.log('event.value state = ' + event.value.state);
    console.log('event.value zipCode = ' + event.value.zipCode);
    console.log('event.value latitude = ' + event.value.latitude);
    console.log('event.value longitude = ' + event.value.longitude);
    console.log('event.value location = ' + event.value.location);
    console.log('event.value description = ' + event.value.description);
    if (typeof event.value.id === 'number') {
      this.dataService.editEventRecord('update/event', event.value, event.value.id)
          .subscribe(
            event =>  {
              this.successMessage = 'Record updated successfully';
              this.router.navigate(['/admin-event']);
            },
            error =>  this.errorMessage = <any>error);
    }else {
      this.dataService.addRecord('add/event', event.value)
          .subscribe(
            event => this.successMessage = 'Record added successfully',
            error =>  this.errorMessage = <any>error);
            this.wellnessEvent = {};
    }
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.title = 'Modify Event...' : this.title = 'Create Event...' ;
        (+params['id']) ? this.getRecordForEdit(+params['id']) : null;
        console.log('ID = ' + +params['id']);
      });
      console.log('In ngOnInit');
      console.log(this.wellnessEvent);
  }

  // onSelect(countryid) {
  //   this.states = this._dataService.getStates().filter((item)=> item.countryid == countryid);
  // }

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
