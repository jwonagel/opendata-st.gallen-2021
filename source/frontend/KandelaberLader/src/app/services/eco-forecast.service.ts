import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcoForecastService {

  constructor(private httpClient: HttpClient) { }

  getEcoForecastData(): Observable<any> {
    return this.httpClient.get('./assets/weather/sunprediction.json')
      .pipe(
        shareReplay(1)
      )
  } 
}
