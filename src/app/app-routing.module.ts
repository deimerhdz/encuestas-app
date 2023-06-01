import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';

const routes: Routes = [

  {
    //locahost:4200/home
    path:'home',
    component:HomeComponent,
    loadChildren: () => import(`./modules/home/home.module`).then(m=>m.HomeModule)
  },
  {
    //localhost:42000
    path:'',
    loadChildren: () => import(`./modules/auth/auth.module`).then(m=>m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
