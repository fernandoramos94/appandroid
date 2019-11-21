import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-restaurante',
  templateUrl: './detalle-restaurante.page.html',
  styleUrls: ['./detalle-restaurante.page.scss'],
})
export class DetalleRestaurantePage implements OnInit {
  public technologies: Array<{ name: string, description: string, image: string }> = [
    {
      name: 'Angular',
      description: 'Google\'s front-end development framework - default option for Ionic development',
      image: '/assets/images/angular-logo.png'
    },
    {
      name: 'VueJS',
      description: 'Latest cutting edge front-end development framework - can be enabled as an option for Ionic development',
      image: '/assets/images/vuejs-logo.png'
    },
    {
      name: 'React',
      description: 'Popular front-end development framework from Facebook- can be enabled as an option for Ionic development',
      image: 'assets/images/react-logo.png'
    },
    {
      name: 'TypeScript',
      description: 'Superset of JavaScript that provides class based object oriented programming and strict data typing',
      image: 'assets/images/typescript-logo.png'
    },
    {
      name: 'Ionic Native',
      description: 'Apache Cordova compatible plugins that allow native device API\'s to be utilised',
      image: 'assets/images/ionic-native-logo.png'
    },
    {
      name: 'Capacitor',
      description: 'Plugins for Progressive Web App and hybrid app development',
      image: 'assets/images/capacitor-logo.png'
    },
    {
      name: 'StencilJS',
      description: 'Custom web component development framework',
      image: 'assets/images/stencil-logo.png'
    },
    {
      name: 'Sass',
      description: 'CSS pre-processor development library',
      image: 'assets/images/sass-logo.png'
    },
    {
      name: 'HTML5',
      description: 'Markup language and front-end API support',
      image: 'assets/images/html5-logo.png'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  irCarrito(){
    
  }

  public captureName(event: any) : void
  {
     console.log(`Captured name by event value: ${event}`);
  }

}
