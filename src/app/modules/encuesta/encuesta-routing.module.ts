import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoEncuestaComponent } from './pages/listado-encuesta/listado-encuesta.component';

const routes: Routes = [
  {
    //locahost:4200/encuesta
    path:'',
    component:ListadoEncuestaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestaRoutingModule { }
