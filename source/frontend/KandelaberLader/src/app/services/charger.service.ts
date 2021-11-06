import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargerService {

  constructor(private httpClient: HttpClient) { }

  getChargerData(): Observable<any> {
    return this.httpClient.get('./assets/chargers/kandelaberlader.geojson')
      .pipe(
        shareReplay(1)
      )
  } 
}
