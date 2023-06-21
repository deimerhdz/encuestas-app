import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealizarEncuestaComponent } from './pages/realizar-encuesta/realizar-encuesta.component';
import { FinalizadoComponent } from './pages/finalizado/finalizado.component';

const routes: Routes = [
  {
    path:'finalizado',
    component:FinalizadoComponent
  },
  {
    path:':hash',
    component:RealizarEncuestaComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestadoRoutingModule { }
