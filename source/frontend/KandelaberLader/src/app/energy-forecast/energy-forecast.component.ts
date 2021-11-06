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
  Highcharts = Highcharts;
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    series: [{
      type: 'spline',
    }]
  };
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
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
            type: 'spline',
            name: "Energie (Wh)",
            data: x.series[1].data,
            pointStart: Date.parse(x.series[0].data[0]),
            pointInterval: 3600 * 1000,
          }],
          yAxis: {
            title: {
              text: 'Eco Index'
            },
            plotBands: [
              { // Light air
                from: 10000001,
                to: 40000000,
                color: 'rgba(0,255,0,0.3)',
                label: {
                  text: 'Ökostrom',
                  style: {
                    color: '#606060'
                  }
                }
              }
              , { // Light air
                from: 0,
                to: 10000000,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                  text: 'Graustrom',
                  style: {
                    color: '#606060'
                  }
                }
              }],
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


