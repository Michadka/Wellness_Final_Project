import { Component, OnInit, Input, Pipe, PipeTransform, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

export class MemberComponent implements OnInit {

user: object = JSON.parse(sessionStorage.getItem("currentUser"));
adminStatus: object = JSON.parse(sessionStorage.getItem("adminStatus"));

ngOnInit(){}


  ngAfterContentChecked(){
    this.user = JSON.parse(sessionStorage.getItem("currentUser"));
    this.adminStatus = JSON.parse(sessionStorage.getItem("adminStatus"));
  }

  
  // ngOnInit(this.getMember(){
  // }

  //  getMember() {
  //   this.dataService.getRecords("member")
  //     .subscribe(
  //       member => this.member = member,
  //       error =>  this.errorMessage = <any>error);
  // }

  // inactivateMember(id:number) {
  //   this.dataService.updateRecord("member", id)
  //     .subscribe(
  //       member => {this.successMessage = "You are now inactive"; this.member(); },
  //       error =>  this.errorMessage = <any>error);
  // }

  // activateMember(id:number) {
  //   this.dataService.updateRecord("member", id)
  //     .subscribe(
  //       member => {this.successMessage = "You are now active"; this.member(); },
  //       error =>  this.errorMessage = <any>error);
  // }

}
