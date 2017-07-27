import { Component, OnInit } from '@angular/core';
import {AgmCoreModule } from '@agm/core';
import {  DataService } from '../data.service';
import { ActivatedRoute, Params } from '@angular/router';
// import './pins-bicyle.jpg';

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.css']
})

export class EventMapComponent implements OnInit {

  title: string = 'Events Near You';
  lat: number = 39.9784;
  lng: number = -86.1180;
  myEvent: any = {};
  markers: any = [];

  getEvent(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("eventbyid", +params['id']))
      .subscribe(myEvent => {
        this.myEvent = myEvent
        this.lat = this.myEvent.latitude;
        this.lng = this.myEvent.longitude;
        this.markers = [
          {
            lat: this.myEvent.latitude,
            lng: this.myEvent.longitude,
            name: this.myEvent.eventName,
            address: this.myEvent.streetAddress,
            cityStateZip: this.myEvent.city + ", " +  this.myEvent.state + " " + this.myEvent.zipCode,
            title: this.myEvent.description,
            //icon: "http://maps.google.com/mapfiles/ms/micons/hiker.png"
            icon: "https://maps.google.com/mapfiles/ms/icons/sportvenue.png"
            //icon: "https://maps.google.com/mapfiles/ms/icons/purple-pushpin.png"
          }
        ]
      });
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
    //private location: Location
  ) { }

  ngOnInit() {
      this.route.params
      .subscribe((params: Params) => {
        //console.log((+params['id']))
        (+params['id']) ? this.getEvent() : null;
      });
  }
}
