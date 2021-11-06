import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, LeafletModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, LeafletModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
