import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoOpcionesComponent } from './pages/listado-opciones/listado-opciones.component';

const routes: Routes = [
  {
    path:'',
    component:ListadoOpcionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpcionesRoutingModule { }
