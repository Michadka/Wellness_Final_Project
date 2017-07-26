import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  user: object = JSON.parse(localStorage.getItem("currentUser"));
  adminStatus: boolean = JSON.parse(localStorage.getItem("adminStatus"));

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.adminStatus = JSON.parse(localStorage.getItem("adminStatus"));
  }
}
