import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
// @ts-ignore
import 'leaflet-tilelayer-swiss';
import { ChargerService } from './services/charger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'KandelaberLader';
  public map: any;
  overlayMaps: any;
  baseMaps: any;

  private initMap(): void {
    // this.map = L.map('map', {
    //   center: [47.42391, 9.37477],
    //   zoom: 13
    // });

    this.map = L.map('map', {
      crs: (<any>L.CRS).EPSG2056,
      // center: [2747115.250, 1254358.875],
      center: [47.42391, 9.37477],
      zoom: 9
    });

    var satelliteLayer = (<any>L.tileLayer).swiss({
      layer: 'ch.swisstopo.swissimage',
      maxNativeZoom: 28
    });

    var mapLayer = (<any>L.tileLayer).swiss().addTo(this.map);

    this.baseMaps = {
      'Satellite (Swissimage)': satelliteLayer,
      'Map': mapLayer
    };

    //const parkinglayer = this.loadParking();

    this.overlayMaps = {
      // 'Hiking in Switzerland': (<any>L.tileLayer).swiss({
      //   format: 'png',
      //   layer: 'ch.astra.wanderland',
      //   maxNativeZoom: 26
      // }),
      // 'Cycling in Switzerland': (<any>L.tileLayer).swiss({
      //   format: 'png',
      //   layer: 'ch.astra.veloland',
      //   maxNativeZoom: 26
      // }),
      // 'Mountainbiking in Switzerland': (<any>L.tileLayer).swiss({
      //   format: 'png',
      //   layer: 'ch.astra.mountainbikeland',
      //   maxNativeZoom: 26
      // }),
      // 'Skating in Switzerland': (<any>L.tileLayer).swiss({
      //   format: 'png',
      //   layer: 'ch.astra.skatingland',
      //   maxNativeZoom: 26
      // })
    };

    L.control.layers(this.baseMaps, undefined, {position: 'bottomleft'}).addTo(this.map);
    // this.map.fitSwitzerland();
    this.map.zoomControl.setPosition('bottomright');
    console.log(this.map);

    this.map.flyTo([47.42391, 9.37477], 20)

    this.chargerService.getChargerData().subscribe( chargers => {
      let overlay =this.loadParking(chargers);
      this.map.addLayer(overlay);
    })
  }

  private loadParking(chargers: any) {

    var geojsonMarkerOptions = {
      radius: 8,
      fillColor: "#0078FF",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };

    return L.geoJSON(<any>chargers, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      },
      onEachFeature: function (feature, layer) {
        var html = "";
        for (let prop in feature.properties){
            html += prop+": "+feature.properties[prop]+"<br>";
        };
        layer.bindPopup(html);
    }
    });
  }

  constructor(private chargerService: ChargerService) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  foo() {
    let that = this;
    if (navigator.geolocation) {
      debugger;
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('--- Your Position: ---');
        console.log('Lat: ' + position.coords.latitude);
        const latit = position.coords.latitude;
        console.log('Long: ' + position.coords.longitude);
        const longit = position.coords.longitude;
        console.log('---------------------');
        var abc = L.marker([position.coords.latitude, position.coords.longitude]).addTo(that.map);
        that.map.flyTo(position.coords, 20)
      }, function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }); 
    }
  }
}
