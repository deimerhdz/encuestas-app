import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntasRoutingModule } from './preguntas-routing.module';
import { ListadoPreguntasComponent } from './pages/listado-preguntas/listado-preguntas.component';


@NgModule({
  declarations: [
    ListadoPreguntasComponent
  ],
  imports: [
    CommonModule,
    PreguntasRoutingModule
  ]
})
export class PreguntasModule { }
