import { LoginPageModule } from './pages/login/login.module';
import { NgModule } from '@angular/core';
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
import { BorrarProductosPageModule } from './pages/borrar-productos/borrar-productos.module';
import { CambiarContrasenaPageModule } from './pages/cambiar-contrasena/cambiar-contrasena.module';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import { DireccionGpsPageModule } from './pages/direccion-gps/direccion-gps.module';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(), 
    AppRoutingModule, 
    BorrarProductosPageModule, 
    CambiarContrasenaPageModule,
    LoginPageModule,
    DireccionGpsPageModule
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
