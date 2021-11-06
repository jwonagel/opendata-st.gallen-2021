import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
// @ts-ignore
import 'leaflet-tilelayer-swiss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'KandelaberLader';
  public map: any;

  private initMap(): void {
    // this.map = L.map('map', {
    //   center: [47.42391, 9.37477],
    //   zoom: 13
    // });

    this.map = L.map('map', {
      crs: (<any>L.CRS).EPSG2056 ,
      //center: [ 2747115.250, 1254358.875],¨
      center: [47.42391, 9.37477],
      zoom: 13
    });

    var satelliteLayer = (<any>L.tileLayer).swiss({
      layer: 'ch.swisstopo.swissimage',
      maxNativeZoom: 28
    });

    var mapLayer = (<any>L.tileLayer).swiss().addTo(this.map);
  
    var baseMaps = {
      'Satellite (Swissimage)': satelliteLayer,
      'Map': mapLayer
    };

    var overlayMaps = {
      'Hiking in Switzerland': (<any>L.tileLayer).swiss({
        format: 'png',
        layer: 'ch.astra.wanderland',
        maxNativeZoom: 26
      }),
      'Cycling in Switzerland': (<any>L.tileLayer).swiss({
        format: 'png',
        layer: 'ch.astra.veloland',
        maxNativeZoom: 26
      }),
      'Mountainbiking in Switzerland': (<any>L.tileLayer).swiss({
        format: 'png',
        layer: 'ch.astra.mountainbikeland',
        maxNativeZoom: 26
      }),
      'Skating in Switzerland': (<any>L.tileLayer).swiss({
        format: 'png',
        layer: 'ch.astra.skatingland',
        maxNativeZoom: 26
      }),
    };

    L.control.layers(baseMaps, overlayMaps).addTo(this.map);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.fitSwitzerland();

    console.log(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
