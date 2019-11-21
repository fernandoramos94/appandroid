import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-borrar-productos',
  templateUrl: './borrar-productos.page.html',
  styleUrls: ['./borrar-productos.page.scss'],
})
export class BorrarProductosPage implements OnInit {

  constructor(private modal : ModalController) { }

  ngOnInit() {
  }

  async aceptar(status){
    this.modal.dismiss(status);
  }
}
