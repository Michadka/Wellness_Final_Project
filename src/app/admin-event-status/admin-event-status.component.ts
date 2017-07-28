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
  event: object;
  errorMessage: string;
  successMessage: string;
  data: any[];   // step count data
  layout: any[]; // step count layout

  stepCount: any = [
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
       'stepCount': 17500
   }
]

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
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
          console.log(this.events)
        });
  }

  ngOnInit() {
    this.getEvents();
  }

  displayEvent(id: number, type: string) {
    console.log('Display Stats Event # = ' + id);
    if (type === 'Step Count') {
      console.log('Event = Step Count');
        // data: any[];   // step count data
        // layout: any[]; // step count layout
// - loop over stepCount and populate data


    }else {
      console.log('Event = 5K or 10K');
    }
  }

}

