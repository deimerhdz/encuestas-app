import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerReporteComponent } from './pages/ver-reporte/ver-reporte.component';

const routes: Routes = [{
  path:'',
  component:VerReporteComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
