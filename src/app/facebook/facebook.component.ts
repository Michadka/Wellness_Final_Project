import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/switchMap';
import _ from 'lodash';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})


export class FacebookComponent implements OnInit {
  members: any[];
  member: any;
  errorMessage: string;
  successMessage: string;
  user: object = JSON.parse(sessionStorage.getItem("currentUser"));
  adminStatus: boolean = JSON.parse(sessionStorage.getItem("adminStatus"));

  memberForm: NgForm;
  @ViewChild('memberForm') currentForm: NgForm;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FacebookService
  ) {

    const params: InitParams = {version: "v2.10"}
    fb.init(params);

  }

    
  

  saveMember(member: NgForm){
    console.log("member.value I = " + member.value.id)
    console.log("member.value E = " + member.value.email)
    console.log("member.value P = " + member.value.password)
    console.log("member.value S = " + member.value.screenName)
    console.log("member.value A = " + member.value.admin)
    if(typeof member.value.id === "number"){
      console.log("identified an id exists so edit member")
      this.dataService.editRecord("member", member.value, member.value.id)
          .subscribe(
            member => this.successMessage = "Record updated successfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("member", member.value)
          .subscribe(
            member => {
              this.member = member;
              this.successMessage = "Record added successfully",
              sessionStorage.setItem("currentUser", JSON.stringify(this.member))
              sessionStorage.setItem("adminStatus", JSON.stringify(this.member.admin))
              console.log(JSON.stringify(this.member.admin))
          },
            error =>  this.errorMessage = <any>error)
            this.router.navigate(['/home']),
            this.member = {};
    }
            // this.dataService.updateFacebook()
  }

  ngOnInit() {

  }


}