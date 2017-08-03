import { Component, OnInit } from '@angular/core';
import {  DataService } from '../data.service';
import {  NgForm } from '@angular/forms';
import {  ActivatedRoute,  Params } from '@angular/router';
import {  Location } from '@angular/common';
// import {  MdDialog, MdDialogRef } from '@angular/material';
import 'rxjs/add/operator/switchMap';
import {  DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';


@Component({
  selector: 'app-admin-event-status',
  templateUrl: './admin-event-status.component.html',
  styleUrls: ['./admin-event-status.component.css']
})
export class AdminEventStatusComponent implements OnInit {
  events: any[];
  dataEvents: any[];
  event: object;
  errorMessage: string;
  successMessage: string;
  data: any[];   // step count data
  layout: any[]; // step count layout
  memberIDs: string[];
  title: string;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  barChartLabels: string[];
  barChartData: any[];
  localBarChartData: any[];

  stepsOverTime: any = [
   {
       'wellnessEventID': 4,
       'memberID': 1,
       'dayOfSteps': '2017-06-20',
       'stepCount': 3750
   },
   {
       'wellnessEventID': 4,
       'memberID': 2,
       'dayOfSteps': '2017-06-20',
       'stepCount': 2000
   },
   {
       'wellnessEventID': 4,
       'memberID': 3,
       'dayOfSteps': '2017-06-20',
       'stepCount': 1750
   },
   {
       'wellnessEventID': 4,
       'memberID': 1,
       'dayOfSteps': '2017-06-21',
       'stepCount': 2000
   },
   {
       'wellnessEventID': 4,
       'memberID': 2,
       'dayOfSteps': '2017-06-21',
       'stepCount': 3000
   },
   {
       'wellnessEventID': 4,
       'memberID': 3,
       'dayOfSteps': '2017-06-21',
       'stepCount': 2500
   },
   {
       'wellnessEventID': 4,
       'memberID': 1,
       'dayOfSteps': '2017-06-22',
       'stepCount': 8000
   },
   {
       'wellnessEventID': 4,
       'memberID': 2,
       'dayOfSteps': '2017-06-22',
       'stepCount': 6000
   },
   {
       'wellnessEventID': 4,
       'memberID': 3,
       'dayOfSteps': '2017-06-22',
       'stepCount': 2500
   },
   {
       'wellnessEventID': 4,
       'memberID': 1,
       'dayOfSteps': '2017-06-23',
       'stepCount': 4000
   },
   {
       'wellnessEventID': 4,
       'memberID': 2,
       'dayOfSteps': '2017-06-23',
       'stepCount': 5500
   },
   {
       'wellnessEventID': 4,
       'memberID': 3,
       'dayOfSteps': '2017-06-23',
       'stepCount': 2275
   },
   {
       'wellnessEventID': 4,
       'memberID': 1,
       'dayOfSteps': '2017-06-24',
       'stepCount': 1500
   },
   {
       'wellnessEventID': 4,
       'memberID': 2,
       'dayOfSteps': '2017-06-24',
       'stepCount': 1750
   },
   {
       'wellnessEventID': 4,
       'memberID': 3,
       'dayOfSteps': '2017-06-24',
       'stepCount': 2250
   },
   {
       'wellnessEventID': 4,
       'memberID': 1,
       'dayOfSteps': '2017-06-25',
       'stepCount': 2156
   },
   {
       'wellnessEventID': 4,
       'memberID': 2,
       'dayOfSteps': '2017-06-25',
       'stepCount': 4438
   },
   {
       'wellnessEventID': 4,
       'memberID': 3,
       'dayOfSteps': '2017-06-25',
       'stepCount': 1145
   },
   {
       'wellnessEventID': 4,
       'memberID': 1,
       'dayOfSteps': '2017-06-26',
       'stepCount': 2354
   },
   {
       'wellnessEventID': 4,
       'memberID': 2,
       'dayOfSteps': '2017-06-26',
       'stepCount': 6500
   },
   {
       'wellnessEventID': 4,
       'memberID': 3,
       'dayOfSteps': '2017-06-26',
       'stepCount': 3400
   },
   {
       'wellnessEventID': 4,
       'memberID': 1,
       'dayOfSteps': '2017-06-27',
       'stepCount': 2250
   },
   {
       'wellnessEventID': 4,
       'memberID': 2,
       'dayOfSteps': '2017-06-27',
       'stepCount': 2345
   },
   {
       'wellnessEventID': 4,
       'memberID': 3,
       'dayOfSteps': '2017-06-27',
       'stepCount': 1750
   }
]

  heartRateOverTime: any = [
   {
       'eventID': 2,
       'memberID': 1,
       'statTimestamp': 1497970860000,
       'stat': 65,
       'formattedTime': '01-20-02017 11:01:00',
       'formattedMinute': '00'
   },
   {
       'eventID': 2,
       'memberID': 2,
       'statTimestamp': 1497970860000,
       'stat': 72,
       'formattedTime': '01-20-02017 11:01:00',
       'formattedMinute': '00'
   },
   {
       'eventID': 2,
       'memberID': 3,
       'statTimestamp': 1497970860000,
       'stat': 69,
       'formattedTime': '01-20-02017 11:01:00',
       'formattedMinute': '00'
   },
   {
       'eventID': 2,
       'memberID': 1,
       'statTimestamp': 1497970920000,
       'stat': 85,
       'formattedTime': '02-20-02017 11:02:00',
       'formattedMinute': '01'
   },
   {
       'eventID': 2,
       'memberID': 2,
       'statTimestamp': 1497970920000,
       'stat': 92,
       'formattedTime': '02-20-02017 11:02:00',
       'formattedMinute': '01'
   },
   {
       'eventID': 2,
       'memberID': 3,
       'statTimestamp': 1497970920000,
       'stat': 105,
       'formattedTime': '02-20-02017 11:02:00',
       'formattedMinute': '01'
   },


   {
       'eventID': 2,
       'memberID': 1,
       'statTimestamp': 1497970920000,
       'stat': 89,
       'formattedTime': '02-20-02017 11:02:00',
       'formattedMinute': '02'
   },
   {
       'eventID': 2,
       'memberID': 2,
       'statTimestamp': 1497970920000,
       'stat': 95,
       'formattedTime': '02-20-02017 11:02:00',
       'formattedMinute': '02'
   },
   {
       'eventID': 2,
       'memberID': 3,
       'statTimestamp': 1497970920000,
       'stat': 108,
       'formattedTime': '02-20-02017 11:02:00',
       'formattedMinute': '02'
   },
   {
       'eventID': 2,
       'memberID': 1,
       'statTimestamp': 1497970920000,
       'stat': 93,
       'formattedTime': '02-20-02017 11:02:00',
       'formattedMinute': '03'
   },
   {
       'eventID': 2,
       'memberID': 2,
       'statTimestamp': 1497970920000,
       'stat': 99,
       'formattedTime': '02-20-02017 11:02:00',
       'formattedMinute': '03'
   },
   {
       'eventID': 2,
       'memberID': 3,
       'statTimestamp': 1497970920000,
       'stat': 110,
       'formattedTime': '02-20-02017 11:02:00',
       'formattedMinute': '03'
   },
   {
       'eventID': 2,
       'memberID': 1,
       'statTimestamp': 1497970920000,
       'stat': 96,
       'formattedTime': '02-20-02017 11:02:00',
       'formattedMinute': '04'
   },
   {
       'eventID': 2,
       'memberID': 2,
       'statTimestamp': 1497970920000,
       'stat': 104,
       'formattedTime': '02-20-02017 11:02:00',
       'formattedMinute': '04'
   },
   {
       'eventID': 2,
       'memberID': 3,
       'statTimestamp': 1497970920000,
       'stat': 112,
       'formattedTime': '02-20-02017 11:02:00',
       'formattedMinute': '04'
   }
]

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
    this.dataService.getRecords('getAllEvents')
      .subscribe(
        events => {
          this.events = events
        //   console.log(this.events)
        });
  }

  ngOnInit() {
    this.getEvents();
    this.barChartLabels = [];
    this.barChartData = [];
    this.memberIDs = [];
    // this.displayEvent(this.user.id, 'Step Count');
    this.title = 'Select an event...';
    // this.displayEvent(5, '10K');
  }

  displayEvent(id: number, type: string, eventName: string) {
    // getAllStepsOverTimeRowsByEvent

    console.log('Display Stats Event # = ' + id);
    this.barChartLabels = [];
    this.localBarChartData = [];
    this.memberIDs = [];
    this.title = eventName;
    this.dataEvents = [];
    if (type === 'Step Count') {
    //   console.log('Event = Step Count');

      this.dataService.getRecords('activity/getAllStepsOverTimeRowsByEvent/' + id)
      .subscribe(
        dataEvents => {
          this.dataEvents = dataEvents;
          if (this.dataEvents.length === 0) {
              this.title = this.title + ' - No Stats Available!';
          }
        //   console.log('dataEvents = ' + this.dataEvents);
          // put all of the code below within this if block --> "HERE"
            for ( let i = 0; i < this.dataEvents.length; i++ ) {
                // console.log('chart labels Array contains --> ' + this.barChartLabels );
                // console.log('memberIDs Array contains --> ' + this.memberIDs );
                // console.log('Index = ' + this.barChartLabels.indexOf(String(this.dataEvents[i].formattedTime)));

                // Is this a new date/day, then add the date/day to the barChartLabels array?
                if ( this.barChartLabels.indexOf(String(this.dataEvents[i].formattedTime)) === -1 ) {
                    this.barChartLabels.push(String(this.dataEvents[i].formattedTime));
                    // console.log('Adding the following date --> ' + this.dataEvents[i].formattedTime);
                }
                // else {
                    // console.log('This is already included --> ' + this.dataEvents[i].formattedTime);
                // }

                // Is this a new member ID, then create a new data object
                if ( this.memberIDs.indexOf(String(this.dataEvents[i].memberID)) === -1 ) {
                    this.memberIDs.push(String(this.dataEvents[i].memberID));
                    // this.localBarChartData[i] = {}; // create a new object for this memberID
                    // this.localBarChartData[i].label = this.dataEvents[i].memberID;  // assign the member ID
                    // this.localBarChartData[i].data = []; // create new array for step counts
                    this.localBarChartData.push({}); // create a new object for this memberID
                    const lastIndex = this.localBarChartData.length - 1;
                    this.localBarChartData[lastIndex].data = []; // create new array for step counts
                    this.localBarChartData[lastIndex].label = this.dataEvents[i].memberID;  // assign the member ID
                    // console.log('Adding the following member ID --> ' + this.dataEvents[i].memberID);
                }
                // else {
                    // console.log('This member ID is already included --> ' + this.dataEvents[i].memberID);
                // }

                // determine what the correct data array index for the current user
                for (let j = 0; j < this.localBarChartData.length; j++) {
                    if (this.localBarChartData[j].label === this.dataEvents[i].memberID) {
                        // console.log('steps = ' + this.dataEvents[i].stepCount + ' for memberID ' + this.localBarChartData[j].label);
                        this.localBarChartData[j].data.push(this.dataEvents[i].stepCount);
                        break; // got the correct array index, so no need to continue
                    }
                } // - end of data array for loop
            } // end of dataEvents data consimption for loop

            // now assign the bar chart data so the chart will display
            this.barChartData = this.localBarChartData;
        });
    }else {
    //   console.log('Event = 5K or 10K');
      this.dataService.getRecords('activity/getAllHeartrateRowsByEvent/' + id)
      .subscribe(
        dataEvents => {
          this.dataEvents = dataEvents;
          if (this.dataEvents.length === 0) {
              this.title = this.title + ' - No Stats Available!';
          }
        //   console.log('this.dataEvents.length = ' + this.dataEvents.length);
          // put all of the code below within this else block --> "HERE"
            for ( let i = 0; i < this.dataEvents.length; i++ ) {
                // console.log('#######################################');
                // console.log('chart labels Array contains --> ' + this.barChartLabels );
                // console.log('memberIDs Array contains --> ' + this.memberIDs );
                // console.log('Index = ' + this.barChartLabels.indexOf('Minute ' + String(this.dataEvents[i].formattedMinute)));

                // Is this a new minute, then add the minute to the barChartLabels array?
                if ( this.barChartLabels.indexOf('Minute ' + String(this.dataEvents[i].formattedMinute)) === -1 ) {
                    this.barChartLabels.push('Minute ' + String(this.dataEvents[i].formattedMinute));
                    // console.log('Adding the following minute --> ' + this.dataEvents[i].formattedMinute);
                } else {
                    // console.log('This is already included --> ' + this.dataEvents[i].formattedMinute);
                }

                // Is this a new member ID, then create a new data object
                if ( this.memberIDs.indexOf(String(this.dataEvents[i].memberID)) === -1 ) {
                    this.memberIDs.push(String(this.dataEvents[i].memberID));
                    // console.log('---------> k = ' + k);
                    // console.log('1 - Length of --> this.localBarChartData = ' + this.localBarChartData.length);
                    this.localBarChartData.push({}); // create a new object for this memberID
                    const lastIndex = this.localBarChartData.length - 1;
                    this.localBarChartData[lastIndex].data = []; // create new array for step counts
                    this.localBarChartData[lastIndex].label = this.dataEvents[i].memberID;  // assign the member ID
                    // console.log('Created --> ' + JSON.stringify(this.localBarChartData[i]));
                    // console.log('Adding the following member ID --> ' + this.dataEvents[i].memberID);
                    // console.log('2 - Length of --> this.localBarChartData = ' + this.localBarChartData.length);
                } else {
                    // console.log('This member ID is already included --> ' + this.dataEvents[i].memberID);
                }

                // determine what the correct data array index for the current user
                    // console.log('3 - Length of --> this.localBarChartData = ' + this.localBarChartData.length);
                    for (let j = 0; j < this.localBarChartData.length; j++) {
                        // console.log('Object @ l = ' + l + JSON.stringify(this.localBarChartData[j]));
                        if (this.localBarChartData[j].label === this.dataEvents[i].memberID) {
                            this.localBarChartData[j].data.push(this.dataEvents[i].stat);
                            // console.log('HR = ' + this.dataEvents[i].stat + ' for memberID ' + this.localBarChartData[j].label);
                            break; // got the correct array index, so no need to continue
                        }
                    } // - end of data array for loop
                // }
            } // end of dataEvents data consimption for loop

            // now assign the bar chart data so the chart will display
            this.barChartData = this.localBarChartData;
        });
    } // end of else ('5K or '10K')
  } // displayEvent

}




