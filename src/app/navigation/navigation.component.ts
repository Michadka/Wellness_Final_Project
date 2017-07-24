import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

  user: object = JSON.parse(localStorage.getItem("currentUser"));
  adminStatus: boolean = JSON.parse(localStorage.getItem("adminStatus"));

  constructor(
     private router: Router)
 { }

  ngOnInit() {
    console.log("before adminStatus");
    console.log(localStorage.getItem("adminStatus"));
    console.log(this.adminStatus);
    console.log("after adminStatus");
  }

  ngAfterContentChecked(){
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.adminStatus = JSON.parse(localStorage.getItem("adminStatus"));
  }

  logOutUser(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("adminStatus");
  }

}
