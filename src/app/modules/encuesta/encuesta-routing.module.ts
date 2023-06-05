import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoEncuestaComponent } from './pages/listado-encuesta/listado-encuesta.component';
import { AgregarEncuestaComponent } from './pages/agregar-encuesta/agregar-encuesta.component';
import { EditarEncuestaComponent } from './pages/editar-encuesta/editar-encuesta.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestaRoutingModule { }
