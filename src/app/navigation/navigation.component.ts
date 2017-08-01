import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

  user: object = JSON.parse(sessionStorage.getItem("currentUser"));
  adminStatus: boolean = JSON.parse(sessionStorage.getItem("adminStatus"));

  constructor(
     private router: Router)
 { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    this.user = JSON.parse(sessionStorage.getItem("currentUser"));
    this.adminStatus = JSON.parse(sessionStorage.getItem("adminStatus"));
  }

  logOutUser(){
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("adminStatus");
  }

}
