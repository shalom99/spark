import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParkingLotPage } from '../parking-lot/parking-lot';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';




@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;

  lat:any; lang:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loadMap();
  }


 
  loadMap() {
 
     let mapOptions: GoogleMapOptions = {
       camera: {
         target: {
           lat: 16.41255645,
           lng: 120.59491254
         },
         zoom: 18,
         tilt: 30
       }
     };
 
     this.map = GoogleMaps.create('map_canvas', mapOptions);
 
     // Wait the MAP_READY before using any methods.
     this.map.one(GoogleMapsEvent.MAP_READY)
       .then(() => {
         console.log('Map is ready!');
 
         // Now you can use all methods safely.
         this.map.addMarker({
             title: 'Ionic',
             icon: 'blue',
             animation: 'DROP',
             position: {
               lat: 43.0741904,
               lng: -89.3809802
             }
           })
           .then(marker => {
             marker.on(GoogleMapsEvent.MARKER_CLICK)
               .subscribe(() => {
                 alert('clicked');
               });
           });
 
       });
   }

  

  






}
