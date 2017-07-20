import { Component, OnInit } from '@angular/core';
import {  DataService } from '../data.service';
import {  NgForm } from '@angular/forms';
import {  ActivatedRoute,  Params } from '@angular/router';
import {  Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-wellnessevent',
  templateUrl: './wellnessevent.component.html',
  styleUrls: ['./wellnessevent.component.css']
})
export class WellnesseventComponent implements OnInit {
  events: any[];
  event: object;
  errorMessage: string;
  successMessage: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
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

}
