import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { GraficoBarComponent } from './components/grafico-bar/grafico-bar.component';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    NavComponent,
    GraficoBarComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgChartsModule,
  ],
  exports:[
    NavComponent,
    GraficoBarComponent,
    LogoComponent
  ]

})
export class SharedModule { }
