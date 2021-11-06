import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EcoForecastService } from '../services/eco-forecast.service';

@Component({
  selector: 'app-energy-forecast',
  templateUrl: './energy-forecast.component.html',
  styleUrls: ['./energy-forecast.component.css']
})
export class EnergyForecastComponent implements OnInit {

  forecast?: Observable<any>;

  constructor(private ecoForecastService: EcoForecastService) { }

  ngOnInit(): void {
    this.forecast = this.ecoForecastService.getEcoForecastData();

    // this.forecast.subscribe(x => 
    //   {
    //     console.log(x);
    //   }
    //   )
  }

}
