import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPreguntasComponent } from './pages/listado-preguntas/listado-preguntas.component';

const routes: Routes = [
  {
    path:'',
    component:ListadoPreguntasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreguntasRoutingModule { }
