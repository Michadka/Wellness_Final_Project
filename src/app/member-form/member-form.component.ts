import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
members: any

  constructor(
      private dataService: DataService
  ) {

   }

   getMembers(){
    this.dataService.getRecords("getAllMembers")
      .subscribe(
        members => {
          this.members = members
        console.log(this.members)
      });
  }

  ngOnInit() { this.getMembers(); }

  }


