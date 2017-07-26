import { Component, OnInit, Input,  ViewChild } from '@angular/core';
import {  DataService } from '../data.service';
import {  NgForm } from '@angular/forms';
import {  ActivatedRoute,  Params, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminStatus: boolean = JSON.parse(localStorage.getItem("adminStatus"));
  users: any[];
  user: object = {};
  errorMessage: string;
  successMessage: string;
  adminOn: object = {
    'admin': true
  }

  adminOff: object = {
    'admin': false
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  getUsers() {
    this.dataService.getRecords('getAllMembers')
      .subscribe(
        events => {
          this.users = events
          console.log(this.users)
        });
  }

  updateUser(id, admin) {
    console.log('Clicked ID = ' + id);
    console.log('Admin currently = ' + admin);
    // determine which object to send
    let adminObj: object;
    if (admin) {
      adminObj = this.adminOff;
    } else {
      adminObj = this.adminOn;
    }

    this.dataService.editRecord('member', adminObj, id)
    .subscribe(
      user => this.getUsers()
    );

    console.log('this.adminStatus = ' + this.adminStatus);
    console.log('JSON = ' + JSON.parse(localStorage.getItem("adminStatus")));
    this.adminStatus = JSON.parse(localStorage.getItem("adminStatus"));
  }

  ngOnInit() {
    this.getUsers();
  }

}
