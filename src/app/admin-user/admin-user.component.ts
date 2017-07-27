import { Component, OnInit, Input,  ViewChild } from '@angular/core';
import {  DataService } from '../data.service';
import {  NgForm } from '@angular/forms';
import {  ActivatedRoute,  Params, Router } from '@angular/router';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  events: any = {};
  users: any[];
  title = ''; // page title

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  getEventUsers(id) {
    this.dataService.getRecord('eventbyid', id)
      .subscribe(
        events => {
          this.events = events;
          this.users = this.events.members;
          console.log(this.users)
        });
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        console.log('ID = ' + +params['id']);
        console.log('Name = ' + params['name']);
        // this.title = 'Users signed up for ' + params['name'] + '...';
        this.title = '"' + params['name'] + '" Users...';
        this.getEventUsers(+params['id']);
      });
  }

}
