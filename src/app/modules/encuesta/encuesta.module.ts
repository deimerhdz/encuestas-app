import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestaRoutingModule } from './encuesta-routing.module';
import { ListadoEncuestaComponent } from './pages/listado-encuesta/listado-encuesta.component';



@NgModule({
  declarations: [
    ListadoEncuestaComponent
  ],
  imports: [
    CommonModule,
    EncuestaRoutingModule,

  ]
})
export class EncuestaModule { }
