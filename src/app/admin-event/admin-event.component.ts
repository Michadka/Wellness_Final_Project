import { Component, OnInit } from '@angular/core';
import {  DataService } from '../data.service';
import {  NgForm } from '@angular/forms';
import {  ActivatedRoute,  Params } from '@angular/router';
import {  Location } from '@angular/common';
import {  MdDialog, MdDialogRef } from '@angular/material';
import 'rxjs/add/operator/switchMap';
import {  DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.css']
})

export class AdminEventComponent implements OnInit {
  events: any[];
  event: object;
  errorMessage: string;
  successMessage: string;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

 
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MdDialog
  ) {}

  getEvents() {
    this.dataService.getRecords('getAllEvents')
      .subscribe(
        events => {
          this.events = events
          console.log(this.events)
          this.dtTrigger.next();
        });
     
      
  }

  ngOnInit() {
    this.getEvents();
    this.dtOptions = {
     dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
       // 'columnsToggle',
        'colvis',
        'copy',
        'print'
      ]
   }
  }

  deleteEvent(id: number) {

    const dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      console.log('Yes click with id = ' + id);
      this.dataService.deleteRecord('delete/event', id)
          .subscribe(
            // event => this.successMessage = 'Event deleted successfully',
            event => this.getEvents(),
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}

