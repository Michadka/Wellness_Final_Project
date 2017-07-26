import { Component, OnInit } from '@angular/core';
import {AgmCoreModule } from '@agm/core';
import {  DataService } from '../data.service';
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
  myEvent: object = {};

  // displayLocations(){
  //    for each location in locations
  //       let lat: number = latitude;
  //       let lng: number = longitude;
  //       let title: string = location;
  //       let address: string = streetAddress;
  //       let cityStateZip: string = city + state + zip
  //       let city: string = city;
  //       let state: string = state;
  //       let zip: string = zipCode;
  // }

  getEvent(id) {
    this.dataService.getRecord('eventbyid', id)
      .subscribe(
        event => {
          this.myEvent = event;
          console.log('All events = ' + this.myEvent);
        });
  }

  markers: object[] = [
    {
      lat: 39.9784,
      lng: -86.1180,
      address: "123-45 126th Street",
      cityStateZip: "Carmel, IN 46032",
      title: "Carmel-title",
      icon: "http://maps.google.com/mapfiles/ms/micons/hiker.png"
    },
    {
      lat: 39.7684,
      lng: -86.1158,
      name: "Downtown-name",
      title: "Downtown-title",
      icon: "http://maps.google.com/mapfiles/ms/micons/cycling.png"
    },
    {
      lat: 39.9568,
      lng: -86.0134,
      name: "Fishers-name",
      title: "Fishers-title",
      icon: 'http://maps.google.com/mapfiles/ms/micons/wheel_chair_accessible.png'
    },
    {
      lat: 40.045684,
      lng: -86.0086,
      name: "Nobelsville-name",
      title: "Nobelsville-title",
      icon: "http://maps.google.com/mapfiles/ms/micons/rangerstation.png"
    }
  ]

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

}
