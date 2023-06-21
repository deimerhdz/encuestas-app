import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { VerReporteComponent } from './pages/ver-reporte/ver-reporte.component';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VerReporteComponent
  ],
  imports: [
    CommonModule,
    
    ReporteRoutingModule,
    SharedModule
  ]
})
export class ReporteModule { }
