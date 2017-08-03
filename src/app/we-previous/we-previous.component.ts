import { Component, OnInit } from '@angular/core';
import {  DataService } from '../data.service';
import {  NgForm } from '@angular/forms';
import {  ActivatedRoute,  Params } from '@angular/router';
import {  Location } from '@angular/common';
// import {  MdDialog, MdDialogRef } from '@angular/material';
import 'rxjs/add/operator/switchMap';
import {  DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';


@Component({
  selector: 'app-we-previous',
  templateUrl: './we-previous.component.html',
  styleUrls: ['./we-previous.component.css']
})

export class WePreviousComponent implements OnInit {
  events: any;
  dataEvents: any[];
  event: object;
  errorMessage: string;
  successMessage: string;
  data: any[];   // step count data
  layout: any[]; // step count layout
  memberIDs: string[];
  title: string;
  user: any = JSON.parse(sessionStorage.getItem('currentUser'));
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  barChartLabels: string[];
  barChartData: any[];
  localBarChartData: any[];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
    // public dialog: MdDialog
  ) {}

  getEvents() {
    this.events = [];
    this.dataService.getRecords('getAllEvents')
      .subscribe(
        events => {
          // loop over events and only save those where current ID is in the event
          for ( let i = 0; i < events.length; i++ ) {
            // console.log ( 'outer loop i = ' + i);
            for ( let j = 0; j < events[i].members.length; j++) {
              // console.log ( 'inner loop j = ' + j);
              if ( String(events[i].members[j].id) === String(this.user.id) ||
                   String(events[i].members[j]) === String(this.user.id)) {
                console.log('>>>>>>>>>>>>>>>> pushing ' + events[i]);
                this.events.push(events[i]);
                break;
              } // -- end of if
            } // -- end of inner for loop
          // console.log(events);
          } // -- end of out for loop
          // console.log(this.events);
        });
  }

  ngOnInit() {
    this.getEvents();
    this.barChartLabels = [];
    this.barChartData = [];
    this.memberIDs = [];
    // this.displayEvent(this.user.id, 'Step Count');
    this.title = 'Select an event!';
    console.log('############## User = ' + JSON.stringify(this.user));
    // this.displayEvent(5, '10K');
  }

  displayEvent(id: number, type: string, eventName: string) {
    // getAllStepsOverTimeRowsByEvent

    console.log('Display Stats Event # = ' + id);
    this.barChartLabels = [];
    this.localBarChartData = [];
    this.memberIDs = [];
    this.title = eventName;
    if (type === 'Step Count') {
      console.log('Event = Step Count');

      this.dataService.getRecords('activity/getAllStepsOverTimeRowsByEvent/' + id)
      .subscribe(
        dataEvents => {
          this.dataEvents = dataEvents;
          console.log('dataEvents = ' + this.dataEvents);
          // put all of the code below within this if block --> "HERE"
            for ( let i = 0; i < this.dataEvents.length; i++ ) {
                console.log('#######################################');
                console.log('chart labels Array contains --> ' + this.barChartLabels );
                console.log('memberIDs Array contains --> ' + this.memberIDs );
                console.log('Index = ' + this.barChartLabels.indexOf(String(this.dataEvents[i].formattedTime)));

                // Is this a new date/day, then add the date/day to the barChartLabels array?
                if ( this.barChartLabels.indexOf(String(this.dataEvents[i].formattedTime)) === -1 ) {
                    this.barChartLabels.push(String(this.dataEvents[i].formattedTime));
                    console.log('Adding the following date --> ' + this.dataEvents[i].formattedTime);
                }
                // else {
                    // console.log('This is already included --> ' + this.dataEvents[i].formattedTime);
                // }

                // Is this a new member ID, then create a new data object
                // -- Is this the member ID that's logged in?
                if ( String(this.dataEvents[i].memberID) === String(this.user.id) &&
                     this.memberIDs.indexOf(String(this.dataEvents[i].memberID)) === -1 ) {
                    this.memberIDs.push(String(this.dataEvents[i].memberID));
                    this.localBarChartData[0] = {}; // create a new object for this memberID
                    // this.localBarChartData[0].label = this.dataEvents[i].memberID;  // assign the member ID
                    this.localBarChartData[0].label = String(this.user.screenName);  // assign the member screen name
                    this.localBarChartData[0].data = []; // create new array for step counts
                    // console.log('Adding the following member ID --> ' + this.dataEvents[i].memberID);
                }
                // else {
                    // console.log('This member ID is already included --> ' + this.dataEvents[i].memberID);
                // }

                // determine what the correct data array index for the current user
                for (let j = 0; j < this.localBarChartData.length; j++) {
                    // if (this.localBarChartData[j].label === this.dataEvents[i].memberID) {
                    if (this.localBarChartData[j].label === String(this.user.screenName) &&
                        this.user.id === this.dataEvents[i].memberID) {
                        console.log('steps = ' + this.dataEvents[i].stepCount + ' for memberID ' + this.localBarChartData[j].label);
                        this.localBarChartData[j].data.push(this.dataEvents[i].stepCount);
                        break; // got the correct array index, so no need to continue
                    }
                } // - end of data array for loop
            } // end of dataEvents data consimption for loop

            // now assign the bar chart data so the chart will display
            this.barChartData = this.localBarChartData;

            if (this.memberIDs.length === 0) {
              this.title = this.title + ' - No Stats Available!';
            }
        });
    }else {
      console.log('Event = 5K or 10K');
      this.dataService.getRecords('activity/getAllHeartrateRowsByEvent/' + id)
      .subscribe(
        dataEvents => {
          this.dataEvents = dataEvents;
          // put all of the code below within this else block --> "HERE"
            for ( let i = 0; i < this.dataEvents.length; i++ ) {
                console.log('#######################################');
                console.log('chart labels Array contains --> ' + this.barChartLabels );
                console.log('memberIDs Array contains --> ' + this.memberIDs );
                console.log('Index = ' + this.barChartLabels.indexOf('Minute ' + String(this.dataEvents[i].formattedMinute)));
                console.log('Array member ID =  --> ' + this.dataEvents[i].memberID);
                console.log('Logged in member ID =  --> ' + String(this.user.id));

                // Is this a new minute, then add the minute to the barChartLabels array?
                if ( this.barChartLabels.indexOf('Minute ' + String(this.dataEvents[i].formattedMinute)) === -1 ) {
                    this.barChartLabels.push('Minute ' + String(this.dataEvents[i].formattedMinute));
                    console.log('Adding the following minute --> ' + this.dataEvents[i].formattedMinute);
                } else {
                    // console.log('This is already included --> ' + this.dataEvents[i].formattedMinute);
                }

                // Is this a new member ID, then create a new data object
                // -- Is this the member ID that's logged in?
                if ( String(this.dataEvents[i].memberID) === String(this.user.id) &&
                     this.memberIDs.indexOf(String(this.dataEvents[i].memberID)) === -1 ) {
                    this.memberIDs.push(String(this.dataEvents[i].memberID));
                    this.localBarChartData[0] = {}; // create a new object for this memberID
                    // this.localBarChartData[0].label = this.dataEvents[i].memberID;  // assign the member ID
                    this.localBarChartData[0].label = String(this.user.screenName);  // assign the member screen name
                    this.localBarChartData[0].data = []; // create new array for step counts
                    console.log('Adding the following member ID --> ' + this.dataEvents[i].memberID);
                } else {
                    // console.log('This member ID is already included --> ' + this.dataEvents[i].memberID);
                }

                // determine what the correct data array index for the current user
                for (let j = 0; j < this.localBarChartData.length; j++) {
                    // if (this.localBarChartData[j].label === this.dataEvents[i].memberID) {
                    if (this.localBarChartData[j].label === String(this.user.screenName) &&
                        this.user.id === this.dataEvents[i].memberID) {
                        this.localBarChartData[0].data.push(this.dataEvents[i].stat);
                        console.log('HR = ' + this.dataEvents[i].stat + ' for memberID ' + this.localBarChartData[0].label);
                        break; // got the correct array index, so no need to continue
                    }
                } // - end of data array for loop
            } // end of dataEvents data consimption for loop

            // now assign the bar chart data so the chart will display
            this.barChartData = this.localBarChartData;

            if (this.memberIDs.length === 0) {
              this.title = this.title + ' - No Stats Available!';
            }
        });

    } // end of else ('5K or '10K')
  } // displayEvent

}





