import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  tieneToken : any = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage : Storage,
    private router : Router,
    private androidPermissions: AndroidPermissions
  ) {
    this.storage.get("TOKEN").then((resp)=>{
      if(resp != null){
        this.tieneToken = true;
        this.initializeApp();
      }else{
        this.tieneToken = false;
        this.initializeApp();
      }
      
    })
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.statusBar.backgroundColorByName('white');
      this.statusBar.styleDefault();
      this.checkPermisions();
        if(this.tieneToken){
          this.router.navigateByUrl("/");
          this.splashScreen.hide();
        }else{
          this.router.navigateByUrl("/login");
          this.splashScreen.hide();
        }
    });
  }


  checkPermisions(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => '',
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION]);
  }
  
}
