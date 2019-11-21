import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CambiarContrasenaPage } from '../cambiar-contrasena/cambiar-contrasena.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  async cambiarContrasena(){
    const modal = await this.modalController.create({
      component: CambiarContrasenaPage,
      cssClass: 'modal-contrasena',
      keyboardClose: false
    });

    modal.onDidDismiss().then((resp)=>{

      alert(JSON.stringify(resp));
    })
    return await modal.present();
    
  }

}
