import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalleRestaurantePage } from './detalle-restaurante.page';
import { CollapseComponent } from 'src/app/components/collapse/collapse.component';
import { ExpandedDetailDirective } from 'src/app/directives/expanded-detail.directive';

const routes: Routes = [
  {
    path: '',
    component: DetalleRestaurantePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalleRestaurantePage, CollapseComponent, ExpandedDetailDirective]
})
export class DetalleRestaurantePageModule {}
