import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-grafico-bar',
  templateUrl: './grafico-bar.component.html',
  styleUrls: ['./grafico-bar.component.css']
})
export class GraficoBarComponent  implements OnInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input()
  public mostrar:boolean;
  
  @Input()
  public barChartData: ChartData<'bar'>;
  //  = {
  //  labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
  //  datasets: [
  //    { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
  //  ]
  // };
  constructor() {
    
   }
  ngOnInit(): void {

  }
  

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
  };
  public barChartPlugins = [
    DataLabelsPlugin
  ];
  public barChartType: ChartType = 'bar';
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }
}
