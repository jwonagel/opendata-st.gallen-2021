import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EcoForecastService } from '../services/eco-forecast.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-energy-forecast',
  templateUrl: './energy-forecast.component.html',
  styleUrls: ['./energy-forecast.component.css']
})
export class EnergyForecastComponent implements OnInit {

  forecast?: any;
  Highcharts=Highcharts;
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = { series: [{
    type: 'line',
  }]};
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) {  } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor(private ecoForecastService: EcoForecastService) { }

  ngOnInit(): void {
    this.ecoForecastService.getEcoForecastData()
      .subscribe(x => {
        this.forecast = x;
        this.chartOptions = { 
          title: {
            text: 'Ökovorhersage'
          },
          subtitle: {
              text: 'Zeitpunkte mit hohem Solarstromanteil'
          },
          series: [{
          type: 'line',
          data: x.series[1].data,
          pointStart: Date.parse(x.series[0].data[0]),
          pointInterval: 3600 * 1000,
        }],
        yAxis: {
          title: {
            text: 'Eco Index'
        }
        },  
        xAxis: {
          title: {
           text: 'Date'
          },
          type: 'datetime'
        },
        chart: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }
        
     };

    });
  }
}


