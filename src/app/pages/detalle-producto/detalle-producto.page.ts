import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { BorrarProductosPage } from '../borrar-productos/borrar-productos.page';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController, public modalController: ModalController) { }
  cantidad : any = 1;

  ngOnInit() {
  }

  numeroCantidad(status){
    if(!status){
      this.cantidad = this.cantidad == 1 ? 1 : this.cantidad - 1;
    }else{
      this.cantidad = this.cantidad + 1;
    }
  }

  async agregarProducto(){
    const modal = await this.modalController.create({
      component: BorrarProductosPage,
      cssClass: 'modal-borrar'
    });

    modal.onDidDismiss().then((resp)=>{

      alert(JSON.stringify(resp));
    })
    return await modal.present();
    
  }

}
