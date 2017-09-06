import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mapData =  [{
    "name": "Map1",
    "lat": 43.071584,
    "lng": -89.380120,
    "center": true
  }, {
    "name": "Map2",
    "lat": 43.074395,
    "lng": -89.381056
  }, {
    "name": "Map3",
    "lat": 43.07336,
    "lng": -89.38335
  }]
  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    setTimeout(()=>{
       
        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
          center: this.mapData.find((d: any) => d.center),
          zoom: 16
        });

        this.mapData.forEach((markerData: any) => {
          let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
          });

          let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            title: markerData.name
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

     
    },500);
      

  }

}
