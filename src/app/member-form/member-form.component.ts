import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/switchMap';
import _ from 'lodash';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})

export class MemberFormComponent implements OnInit {
  members: any[];
  member: object;
  errorMessage: string;
  successMessage: string;

  memberForm: NgForm;
  @ViewChild('memberForm') currentForm: NgForm;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  getMembers(){
    console.log("in member-form.ts - getMembers()")
    this.dataService.getRecords("getAllMembers")
    .subscribe(
      members => {
        this.members = members
      console.log(this.members)
    });
  }

  getRecordForEdit(){
    console.log("in member-form.ts - getRecordForEdit()")
    this.route.params
    .switchMap((params: Params) => this.dataService.getRecord("member", +params['id']))
    .subscribe(member => this.member = member);
  }

  saveMember(member: NgForm){
    console.log("member.value I = " + member.value.id)
    console.log("member.value E = " + member.value.email)
    console.log("member.value P = " + member.value.password)
    console.log("member.value S = " + member.value.screenName)
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
              localStorage.setItem("currentUser", JSON.stringify(this.member))},
            error =>  this.errorMessage = <any>error)
            this.router.navigate(['/home']),
                  console.log(this.member)
                  console.log("This.Member = " + this.member)
                  console.log("Member = " + member)
                  console.log("This.Member.id = " + member.value.id)
            this.member = {};
    }
  }




  // activateMember(id:number) {
  //   this.dataService.updateRecord("member", id)
  //     .subscribe(
  //       member => {this.successMessage = "You are now active"; this.member(); },
  //       error =>  this.errorMessage = <any>error);
  // }



  ngOnInit() {
      console.log("member-form onInit")
      // console.log(params)
      this.route.params
        .subscribe((params: Params) => {
          (+params['id']) ? this.getRecordForEdit() : null;
        });
  }

  onValueChanged(data?: any) {
    let form = this.memberForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'email': '',
    'email-repeat': '',
    'password': '',
    'password-repeat': '',
    'screenname': ''
  };

  validationMessages = {
    'email': {
      'required': 'email is required.',
      'minlength': 'email must be at least 5 characters long.'
    },
    'email-repeat': {
      'required': 'email is required.',
      'minlength': 'email must be at least 5 characters long.'
    },
    'password': {
      'required': 'Password is required.'
    },
    'password-repeat': {
      'required': 'Password is required.'
    },
    'screenname': {
      'required': 'Screen name is required.',
      'minlength': 'Screen name must be at least 3 characters long.'
    }
  };

  emailCheck() {
    //verify both emails are the same - only pass one from the form

  }

  passwordCheck() {
    //verify both passwords are the same - only pass one from the form
  }

}