import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DireccionGpsPage } from './direccion-gps.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionGpsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DireccionGpsPage]
})
export class DireccionGpsPageModule {}
