import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoEncuestaComponent } from './pages/listado-encuesta/listado-encuesta.component';
import { AgregarEncuestaComponent } from './pages/agregar-encuesta/agregar-encuesta.component';
import { EditarEncuestaComponent } from './pages/editar-encuesta/editar-encuesta.component';
import { VerEncuestaComponent } from './pages/ver-encuesta/ver-encuesta.component';

const routes: Routes = [
  {
    //locahost:4200/encuesta
    path:'',
    component:ListadoEncuestaComponent
  },
  {
    path:'nueva-encuesta',
    component:AgregarEncuestaComponent
  },
  {
    path:'editar-encuesta/:id',
    component:EditarEncuestaComponent
  },
  {
    path:'ver-encuesta/:hash',
    component:VerEncuestaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestaRoutingModule { }
