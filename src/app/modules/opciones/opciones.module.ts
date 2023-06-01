import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpcionesRoutingModule } from './opciones-routing.module';
import { ListadoOpcionesComponent } from './pages/listado-opciones/listado-opciones.component';


@NgModule({
  declarations: [
    ListadoOpcionesComponent
  ],
  imports: [
    CommonModule,
    OpcionesRoutingModule
  ]
})
export class OpcionesModule { }
