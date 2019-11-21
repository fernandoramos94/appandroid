import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MisDireccionesPage } from './mis-direcciones.page';

const routes: Routes = [
  {
    path: '',
    component: MisDireccionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MisDireccionesPage]
})
export class MisDireccionesPageModule {}
