import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navCtrl: NavController, private fb: Facebook, private storage: Storage, private router: Router) { }

  ngOnInit() {
  }
  login() {
    (<any>window).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
      defaultCountryCode: "CO",
      facebookNotificationsEnabled: true
    }, (data) => {
      (<any>window).AccountKitPlugin.getAccount((info) => {
        this.navCtrl.navigateRoot("/home");
      }, (error) => {
        alert(error);
      })
    })
  }
  loginFb() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.storage.set("TOKEN", res);
        this.getUserDetail(res.authResponse.userID);
      })
      .catch(e => alert(JSON.stringify(e)));
  }
  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,first_name,last_name,picture', ['public_profile'])
      .then(res => {
        this.router.navigateByUrl("/");
      })
      .catch(e => {
        console.log(e);
      });
  }

}
