import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private navCtrl: NavController, 
    private fb: Facebook, 
    private storage: Storage, 
    private router: Router,
    private api_rest : UsuarioService,
    public loading : LoadingController,
    public toastController: ToastController
    ) { }

    formUser : any = {
      correo: "",
      contrasena: ""
    }
    formLoading: any ;

  ngOnInit() {
  }

  async presentLoading() {
    this.formLoading = await this.loading.create({
      message: 'Espere...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await this.formLoading.present();
  }
  async presentToast(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      color: "danger",
      duration: 3000
    });
    toast.present();
  }

  loginApp(){
    this.presentLoading();
    this.api_rest.login(this.formUser).subscribe((resp:any)=>{
      this.formLoading.dismiss();
      if(resp.status == 1){
        this.storage.set("TOKEN", resp.data[0]);
        this.router.navigateByUrl("/home/tabs/tab1");
      }else{
        this.presentToast(resp[0].msg)
      }
      
    }, (error)=>{
      this.formLoading.dismiss();
      alert(JSON.stringify(error));
    })
  }

  login() {
    (<any>window).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
      defaultCountryCode: "CO",
      facebookNotificationsEnabled: true
    }, (data) => {
      (<any>window).AccountKitPlugin.getAccount((info) => {
        this.navCtrl.navigateRoot("/home/tabs");
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
    this.fb.api('/' + userid + '/?fields=id,email,name,first_name,last_name,picture,birthday', ['public_profile'])
      .then(res => {
        this.router.navigateByUrl("/home/tabs/tab1");
      })
      .catch(e => {
        console.log(e);
      });
  }
  

}
