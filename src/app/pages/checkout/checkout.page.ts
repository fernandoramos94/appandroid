import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CartService } from 'src/app/servicios/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(
    private storage : Storage,
    public apiCart : CartService
  ) { }

  details: any;

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.storage.get("TOKEN").then(resp=>{
      if(resp){
        this.readCart(resp.id_usuario)
      }
    })
  }
  readCart(id){
    this.apiCart.getAll(id).subscribe(resp=>{
      this.details = resp;
    })
  }
  public sum : number = 0;
  public subtotal(items){
    this.sum = 0;
    for(let i = 0; i < items.length; i++){
      this.sum = this.sum +  items[i].price_total;    
    }
    return this.sum;
  }

  public total(delivery, sub){
    return parseInt(delivery) + parseInt(sub);
  }

}
