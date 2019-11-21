import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Storage } from '@ionic/storage';
import { ModalController, Platform } from '@ionic/angular';
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
    address: string;
    userLocation;
    userCity;
    latLngResult;
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
        public zone: NgZone
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
        let mapOptions = {
            center: latLng,
            zoom: 17,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        if(status == false) {this.adddd()};
        

        this.map.addListener('center_changed', (e) => {
            this.locationCoords.latitude = this.map.center.lat();
            this.locationCoords.longitude = this.map.center.lng();
            this.adddd();
        });
    }
    
    adddd() {
        let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(this.locationCoords.latitude, this.locationCoords.longitude, options)
        .then((result: NativeGeocoderResult[]) => {
            this.address = this.generateAddress(result[0]);
        })
        .catch((error: any) => console.log(error));
    }

    generateAddress(addressObj){
        let obj = [];
        let address = "";
        for (let key in addressObj) {
          obj.push(addressObj[key]);
        }
        obj.reverse();
        for (let val in obj) {
          if(obj[val].length)
          address += obj[val]+', ';
        }
      return address.slice(0, -2);
    }
    confirmarDireccion() {
        this.storage.set("direccion", this.locationCoords);
        this.modal.dismiss(true);
    }
    buscardir(){
        let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 1
        };
        this.nativeGeocoder.forwardGeocode(this.address, options)
        .then((result: NativeGeocoderResult[]) => {
            this.locationCoords.latitude = result[0].latitude;
            this.locationCoords.longitude = result[0].longitude;
            this.loadMap(true);
        }).catch((error: any) => alert(JSON.stringify(error)));
    }


}
