import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Storage } from '@ionic/storage';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google;

const iconMap = "../../../assets/center_marker.png";

@Component({
    selector: 'app-direccion-gps',
    templateUrl: './direccion-gps.page.html',
    styleUrls: ['./direccion-gps.page.scss'],
})
export class DireccionGpsPage implements OnInit {

    @ViewChild('map', { static: false }) mapElement: ElementRef;
    map: any;
    address: any;
    userLocation;
    userCity;
    latLngResult;

    mapOptions;

    locationCoords: any;

    dir: any;

    constructor(
        private geolocation: Geolocation,
        private locationAccuracy: LocationAccuracy,
        private storage: Storage,
        private modal: ModalController,
        private androidPermissions: AndroidPermissions,
        private nativeGeocoder: NativeGeocoder,
        private platform: Platform,
        public zone: NgZone,
        private alertController: AlertController
    ) {
        this.locationCoords = {
            latitude: "",
            longitude: "",
            accuracy: "",
            timestamp: "",
            direccion: "Dirección Actual"
        }
    }
    ionViewDidEnter() {
        this.platform.backButton.subscribe(() => {
            navigator['app'].exitApp();
        });
    }

    ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.locationCoords.latitude = position.coords.latitude;
                this.locationCoords.longitude = position.coords.longitude;
                this.loadMap(false);
            }, function () {
                this.loadMap(false);
            });
        }

    }

    loadMap(status) {
        let latLng = new google.maps.LatLng(this.locationCoords.latitude, this.locationCoords.longitude);
        this.mapOptions = {
            center: latLng,
            zoom: 17,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

        if (status == false) { this.adddd() };

        var marker = new google.maps.Marker({
            position:latLng,
            map: this.map,
            title: this.address,
            draggable:true,
            // icon: iconMap
        });
        // marker.setMap(this.map);

    }

    adddd() {
        let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(this.locationCoords.latitude, this.locationCoords.longitude, options)
            .then((result: NativeGeocoderResult[]) => {
                this.address = result[0].thoroughfare + " " + result[0].subThoroughfare;
            })
            .catch((error: any) => console.log(error));
    }

    confirmarDireccion() {
        this.storage.set("direccion", this.locationCoords);
        this.modal.dismiss(true);
    }
    buscardir() {
        let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 1
        };
        this.nativeGeocoder.forwardGeocode(this.address, options)
            .then((result: NativeGeocoderResult[]) => {
                this.locationCoords.latitude = result[0].latitude;
                this.locationCoords.longitude = result[0].longitude;
                this.locationCoords.direccion = this.address;
                this.loadMap(true);
            }).catch((error: any) => alert(JSON.stringify(error)));
    }
    async cambiarDireccion() {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            mode: "ios",
            header: 'Ingrese su dirección',
            inputs: [
                {
                    name: 'direccion',
                    type: 'text',
                    placeholder: 'Dirección'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Ok',
                    handler: (e) => {
                        this.address = e.direccion;
                        this.buscardir();
                    }
                }
            ]
        });

        await alert.present();
    }



}
