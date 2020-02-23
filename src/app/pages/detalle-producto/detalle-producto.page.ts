import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { DetailProductService } from 'src/app/servicios/detail-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { CartService } from 'src/app/servicios/cart.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
  providers : [CurrencyPipe]
})
export class DetalleProductoPage implements OnInit {

  constructor(
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    public apiDetail: DetailProductService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private cp: CurrencyPipe,
    private storage: Storage,
    private loadingController : LoadingController,
    public cartApi : CartService
  ) { }
  cantidad: any = 1;
  details: any = [];
  habilitar= false;
  loading: any;
  usuario: any;

  ngOnInit() {
    
    this.storage.get("TOKEN").then(resp=>{
      this.usuario = resp;
    })

    let myId = this.route.snapshot.paramMap.get('id_product');
    this.apiDetail.detail(myId).subscribe((resp) => {
      this.details = resp[0];
    })
  }
  async modalOption(data: any, details) {
    let dataInput: any = this.dataModal(data);
    const alert = await this.alertController.create({
      header: 'Seleccione',
      mode: "ios",
      inputs: dataInput,
      cssClass: "modal_options",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Guardar',
          handler: (res) => {
            let arrayString  = [];
            data.valor_total = 0;
            data.topping.filter((res)=>{
              let price = res.price == 0 ? '' : ' (' + this.cp.transform(res.price, "$", true, "1.0") + ')';
              if(res.checked == true){
                arrayString.push(res.description+''+price);
                data.valor_total += parseInt(res.price); 
              }
            });
            data.seleccion = arrayString.toString();
            this.numeroCantidad(true, details.categories, false);
            this.habilitarBtn(details.categories)
          }
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss().then((res) => {
      
    })
  }

  dataModal(data) {
    let dataSend = [];
    for (let index = 0; index < data.topping.length; index++) {
      let price = data.topping[index].price == 0 ? '' : ' (' + this.cp.transform(data.topping[index].price, "$", true, "1.0") + ')';
      let checked = data.topping[index].checked == '0' ? false : data.topping[index].checked;
      if(data.topping_type == '1'){
        dataSend.push(
          {
            name: data.topping[index].id_topping,
            type: "radio",
            label: data.topping[index].description + '' + price,
            value: data.topping[index].id_topping,
            checked: checked,
            handler: (resp)=>{
              data.topping.filter((des)=>{
                if(resp.value == des.id_topping){
                  des.checked = true;
                }else{
                  des.checked = false;
                }
              });
            }
          }
        )
      }else{
        dataSend.push(
          {
            name: data.topping[index].id_topping,
            type: "checkbox",
            label: data.topping[index].description + '' + price,
            value: data.topping[index].id_topping,
            checked: checked,
            handler: (resp) => {
              data.topping[index].checked = resp.checked;
            }
          }
        )
      }
    }
    return dataSend;
  }
  numeroCantidad(status, details, cli) {
    let aditionnalTotal:number = 0;
    details.filter((val)=>{
      aditionnalTotal += parseInt(val.valor_total);
    });
    if (!status) {
      this.cantidad = this.cantidad == 1 ? 1 : this.cantidad - 1;
      this.details.price = (this.cantidad * this.details.real_price) + (aditionnalTotal * this.cantidad);
    } else {
      this.cantidad = cli == false ? this.cantidad : this.cantidad + 1;
      this.details.price = (this.cantidad * this.details.real_price) + (aditionnalTotal * this.cantidad);
    }
  }
  habilitarBtn(detail){
    let arrayFilter = [];
    detail.filter(res=>{
      if(res.required == 1){
        arrayFilter.push(res.seleccion);
      }
    });
    let ind = arrayFilter.indexOf('');
    this.habilitar = ind == -1 ? true : false; 
  }

  async agregarProducto() {
    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: 'Ya tienes productos agregado de otro comercio en tu carrito.<br>¿Deseas Borrarlos y comenzar otro pedido?',
      mode: "ios",
      cssClass: "modal_options",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            
          }
        }
      ]
    });

    await alert.present();
  }
  addCart(){
    let cart = this.storage.get("cart").then((resp)=>{
      if(resp && resp.id_store != this.details.id_store){
        this.agregarProducto();
      }else{

        this.presentLoading();
        let categorias = this.details.categories.filter(resp=>{
          let topping = resp.topping.filter(r =>{
            if(r.checked == true){
              return true;
            }
          })
          resp.topping = topping;
          return true;
        });

        let datsaSend = {
          id_product : this.details.product_id,
          id_store: this.details.store_id,
          price: this.details.real_price,
          count: this.cantidad,
          price_total: this.details.price,
          detail: categorias,
          id_user : this.usuario.id_usuario
        }
        this.cartApi.addCart(datsaSend).subscribe((resp)=>{
          this.storage.set("cart", {"id_store": this.details.store_id, "id_user": this.usuario});
          this.loadingController.dismiss();
          history.back();
        });
      }
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Espere un momento...'
    });
    await this.loading.present();
  }
}
