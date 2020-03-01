import { LoginPageModule } from './pages/login/login.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx'
import { AppComponent } from './app.component';
// import { CambiarContrasenaPageModule } from './pages/cambiar-contrasena/cambiar-contrasena.module';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import { DireccionGpsPageModule } from './pages/direccion-gps/direccion-gps.module';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { HttpClientModule } from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(), 
    AppRoutingModule, 
    // CambiarContrasenaPageModule,
    LoginPageModule,
    DireccionGpsPageModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    Geolocation,
    LocationAccuracy,
    AndroidPermissions,
    NativeGeocoder,
    GoogleMaps,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
