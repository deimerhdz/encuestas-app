import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//locahost:4200/home/encuesta
const routes: Routes = [
  {
    path:'encuestas',
    loadChildren: () => import(`../encuesta/encuesta.module`).then(m=>m.EncuestaModule)
  },
  {
    path:'reportes',
    loadChildren: () => import(`../reporte/reporte.module`).then(m=>m.ReporteModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
