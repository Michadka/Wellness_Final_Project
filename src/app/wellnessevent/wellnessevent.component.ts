import { Component, OnInit } from '@angular/core';
import {  DataService } from '../data.service';
import {  NgForm } from '@angular/forms';
import {  ActivatedRoute,  Params } from '@angular/router';
import {  Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-wellnessevent',
  templateUrl: './wellnessevent.component.html',
  styleUrls: ['./wellnessevent.component.css']
})
export class WellnesseventComponent implements OnInit {
  allEvents: any[] = [];
  userEvents: any[];
  userEventIDs: number[] = []; // need to create this array before if can be used
  event: object;
  errorMessage: string;
  successMessage: string;
  user: any = JSON.parse(sessionStorage.getItem('currentUser'));

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getEvents() {
    this.dataService.getRecords('getAllEvents')
      .subscribe(
        events => {
          this.allEvents = events;
          this.getRegisteredEvents();
          console.log(JSON.stringify(this.allEvents));
          this.allEvents.sort(function(a, b){
              return b.members.length - a.members.length;
          });
          this.dtTrigger.next();
        });
  }

  getRegisteredEvents() {
    this.dataService.getRecords('registeredEvents/' + this.user.id)
      .subscribe(
        events => {
          this.userEvents = events;

          // looping through the user's registered events and grabb the event IDs
          for (let i = 0; i < this.userEvents.length; i++) {
            const tempObj: any = this.userEvents[i];
            this.userEventIDs.push(tempObj.id);
          }
          console.log('userEventIDs are = ' + this.userEventIDs);
          // loop through all events and repurpose the members ID
          for (let j = 0; j < this.allEvents.length; j++) {
            // console.log(this.allEvents[j].id);
            if (this.userEventIDs.includes(this.allEvents[j].id) ) {
              console.log(this.allEvents[j].id + ' is one of the users events.');
              this.allEvents[j].members = true;
            }else {
              this.allEvents[j].members = false;
            }
          }
        });
  }

  updateUser(id, checked) {
    console.log('Clicked ID = ' + id);
    console.log('Check was = ' + checked);
    let command: string;
    let anArray = [ { "id": id } ];

    if (checked) {
      command = 'removeMemberFromEvents';
    } else {
      command = 'addMemberToEvents';
    }

    this.dataService.editRecord(command, anArray, this.user.id)
      .subscribe(
        user => {
          this.userEventIDs = [];
          this.getEvents();
        }
      );
  }

  addEvents() {
    // this.dataService.updateRecords('addMemberToEvents')
    //   .subscribe(
    //     events => {
    //       this.events = events
    //       console.log(this.events)
    //     });
  }

  saveChangesToEventList(idsToChange) {
  console.log('idsToChange')
  console.log(idsToChange)
  // need status of join select box, eventID and memberID

  }

 ngOnInit() {
  // this.userId = sessionStorage:get();
   this.getEvents();
  //  this.getRegisteredEvents();
   console.log('User = ' + this.user.id);
  }

}
