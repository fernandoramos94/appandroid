import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Storage } from '@ionic/storage';
import { DireccionGpsPage } from '../direccion-gps/direccion-gps.page';
import { ModalController, LoadingController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


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

    constructor(
        private storage: Storage,
        private loading: LoadingController,
        private modal: ModalController
    ) {
    }

    ngOnInit() {
        this.storage.get("direccion").then((res) => {
            if (!res) {
                this.ventanaDireccion();
            } else {
                this.locationCoords = res;
                this.cargando.dismiss();
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

}
