import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

  user: object = JSON.parse(localStorage.getItem("currentUser"));

  constructor(
     private router: Router)
 { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  logOutUser(){
    localStorage.removeItem("currentUser");
  }

}
