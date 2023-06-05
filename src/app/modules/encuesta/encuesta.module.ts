import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestaRoutingModule } from './encuesta-routing.module';
import { ListadoEncuestaComponent } from './pages/listado-encuesta/listado-encuesta.component';
import { AgregarEncuestaComponent } from './pages/agregar-encuesta/agregar-encuesta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarEncuestaComponent } from './pages/editar-encuesta/editar-encuesta.component';



@NgModule({
  declarations: [
    ListadoEncuestaComponent,
    AgregarEncuestaComponent,
    EditarEncuestaComponent
  ],
  imports: [
    CommonModule,
    EncuestaRoutingModule,
    ReactiveFormsModule

  ]
})
export class EncuestaModule { }
