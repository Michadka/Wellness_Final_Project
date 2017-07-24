import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';
import 'rxjs/add/operator/switchMap';
import _ from 'lodash';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  member: any;
  loginError: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  signinForm: NgForm;
  @ViewChild('signinForm') currentForm: NgForm;

  ngOnInit() {

  }

  getMember(record){
    localStorage.removeItem("currentUser");
    console.log("signin.ts - getMember()")
    this.dataService.getLoginRecord("open/login/", record.value)
    .subscribe(
      member => {
        this.member = member;
      console.log(member)
      localStorage.setItem("currentUser", JSON.stringify(this.member))
      localStorage.setItem("adminStatus", JSON.stringify(this.member.admin))
      this.router.navigate(['/home'])
    },
    error => this.loginError = "invalid login"

    );
  }

  onValueChanged(data?: any) {
    let form = this.signinForm.form;
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

}
