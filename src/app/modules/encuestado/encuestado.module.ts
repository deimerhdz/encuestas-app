import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestadoRoutingModule } from './encuestado-routing.module';
import { RealizarEncuestaComponent } from './pages/realizar-encuesta/realizar-encuesta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FinalizadoComponent } from './pages/finalizado/finalizado.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RealizarEncuestaComponent,
    FinalizadoComponent
  ],
  imports: [
    CommonModule,
    EncuestadoRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EncuestadoModule { }
