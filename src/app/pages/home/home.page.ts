import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Storage } from '@ionic/storage';
import { DireccionGpsPage } from '../direccion-gps/direccion-gps.page';
import { ModalController, LoadingController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { StoresService } from 'src/app/servicios/stores.service';
import { TagsService } from 'src/app/servicios/tags.service';
import { error } from 'protractor';
import { DetailProductService } from 'src/app/servicios/detail-product.service';



@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    locationCoords: any = {
        direccion: "Ubicación actual"
    };
    cargando: any;
    stores: any = [];
    tags: any = [];
    constructor(
        private storage: Storage,
        private loading: LoadingController,
        private modal: ModalController,
        public api_rest : StoresService,
        public tags_service : TagsService,
        public detail: DetailProductService
    ) {
    }

    ngOnInit() {
        this.storage.get("direccion").then((res) => {
            if (!res) {
                this.ventanaDireccion();
            } else {
                this.locationCoords = res;
                this.api_rest.stores(this.locationCoords.longitude, this.locationCoords.latitude).subscribe((resp:any)=>{
                    this.stores = (resp);
                }, (error)=>{
                    alert(JSON.stringify(error));
                });
                this.tags_service.tags().subscribe((resp)=>{
                    this.tags = resp;
                });
            }
        })
    }

    async ventanaDireccion() {
        let modalDir = await this.modal.create({
            component: DireccionGpsPage,
            cssClass: "modal-dir-gps"
        })

        modalDir.onDidDismiss().then((resp) => {
            if (resp == true) {
                this.presentLoading();
                this.ngOnInit();
            }
        })
        return await modalDir.present();
    }

    async presentLoading() {
        this.cargando = await this.loading.create({
            message: '',
        });
        await this.cargando.present();
    }
    doRefresh(event) {
        console.log('Begin async operation');
    
        setTimeout(() => {
          console.log('Async operation has ended');
          event.target.complete();
        }, 2000);
    }
}
