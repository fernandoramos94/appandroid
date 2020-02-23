import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/servicios/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/servicios/stores.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detalle-restaurante',
  templateUrl: './detalle-restaurante.page.html',
  styleUrls: ['./detalle-restaurante.page.scss'],
})
export class DetalleRestaurantePage implements OnInit {
  
  products: any = [];
  detailStore : any = {};
  habilitar: boolean = false;
  constructor(public apiDetail : ProductsService, 
    public apiStore: StoresService, 
    private route: ActivatedRoute, 
    private router: Router,
    private storage: Storage
    ) { }

  ngOnInit() {
    let myId = this.route.snapshot.paramMap.get('id_store');
    this.apiDetail.products(myId).subscribe((resp)=>{
      this.products = resp;
    })
    this.apiStore.by(myId).subscribe((resp)=>{
      this.detailStore = resp;
    })
    
  }
  ionViewWillEnter(){
    this.storage.get("cart").then(resp=>{
      if(resp){
        this.habilitar = true;
      }
    })
  }

  irCarrito(){
    
  }

  public captureName(event: any) : void
  {
     console.log(`Captured name by event value: ${event}`);
  }

}
