import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { EnergyForecastComponent } from './energy-forecast/energy-forecast.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog'; 
import { HighchartsChartModule } from 'highcharts-angular';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    EnergyForecastComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatDialogModule,
    HighchartsChartModule,
    MatGridListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
