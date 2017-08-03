import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import _ from 'lodash';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})

export class MemberFormComponent implements OnInit {
  members: any[];
  member: any;
  errorMessage: string;
  successMessage: string;
  user: object = JSON.parse(sessionStorage.getItem('currentUser'));
  adminStatus: boolean = JSON.parse(sessionStorage.getItem('adminStatus'));
  title = ''; // page title
  instructions = ''; // dialog instruction

  memberForm: NgForm;
  @ViewChild('memberForm') currentForm: NgForm;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  saveMember(member: NgForm) {
    // member.admin is currently undefined, so setting it to the current value
    if (this.member !== null) {
        member.value.admin = this.member.admin;
      }
    if (typeof member.value.id === 'number') {
      console.log('identified an id exists so edit member')
      console.log('##################################### within member-form.component and saveMember');
      this.dataService.editRecord('member', member.value, member.value.id)
          .subscribe(
            member => this.successMessage = 'Record updated successfully',
            error => this.errorMessage = <any>error
          );
    alert("Your data has been saved!")
    }else {
      this.dataService.addRecord('member', member.value)
          .subscribe(
            member => {
              this.member = member;
              this.successMessage = 'Record added successfully',
              sessionStorage.setItem('currentUser', JSON.stringify(this.member));
              sessionStorage.setItem('adminStatus', JSON.stringify(this.member.admin));
              this.router.navigate(['/home']);
            },
            error => this.errorMessage = <any>error
          )
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
      console.log('member-form onInit');
      this.member = JSON.parse(sessionStorage.getItem('currentUser'));
      if (this.member !== null && typeof this.member.id === 'number') {
        this.title = 'Modify User...';
        this.instructions = 'Change desired values...';
      } else {
        this.title = 'Sign Up...';
        this.instructions = 'Complete all fields...';
      }
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