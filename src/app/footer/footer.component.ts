import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  user: object = JSON.parse(sessionStorage.getItem("currentUser"));
  adminStatus: boolean = JSON.parse(sessionStorage.getItem("adminStatus"));

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    this.user = JSON.parse(sessionStorage.getItem("currentUser"));
    this.adminStatus = JSON.parse(sessionStorage.getItem("adminStatus"));
  }
}
