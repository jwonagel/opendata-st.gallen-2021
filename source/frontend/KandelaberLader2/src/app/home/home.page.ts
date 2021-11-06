import { Component } from '@angular/core';
import { circle, geoJSON, icon, latLng, Layer, marker, polygon, tileLayer } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  options = {
    zoom: 5,
    center: latLng(47.42391, 9.37477)
  };
  map: L.Map;
  constructor() {}
  ngInit(){
    this.options = {
      zoom: 5,
      center: latLng(47.42391, 9.37477)
    };
  }

  private initMap(): void {
    console.log("map init")
    this.map = L.map('map', {
      center: [47.42391, 9.37477 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
