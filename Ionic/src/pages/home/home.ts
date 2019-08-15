import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  lat: number;
  lng: number;
  speed:number;
  height = 0;
  ngOnInit() {
    this.geolocation.getCurrentPosition({maximumAge:500, timeout:3000, enableHighAccuracy:true})
    .then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.speed = resp.coords.speed;
      //console.log(this.speed);
      this.getLocation();
    }).catch((error) => {
      console.log('Error getting location', error);
      this.getLocation();
    });
  }

  getLocation()
  {
    setTimeout(() => {
      this.geolocation.getCurrentPosition({maximumAge:500, timeout:3000, enableHighAccuracy:true}).then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        this.speed = resp.coords.speed;
      //  console.log(this.speed);
        this.getLocation();
      }).catch((error) => {
        console.log('Error getting location', error);
        this.getLocation();
      });
    }, 500);
  }

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    public platform: Platform) { 
      this.height = platform.height() - 56;
    }
}
