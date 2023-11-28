import { Component, OnInit, ViewChild } from '@angular/core';
import { response } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'rxjs';
import { DataChar, Data } from 'src/app/core/models/data.char.dto';
import { EncuestaDto } from 'src/app/core/models/encuesta.dto';
import { Encuestado } from 'src/app/core/models/encuestado.dto';
import { RespuestaItemDto } from 'src/app/core/models/respuesta.item.dto';
import { ResultadoEncuestaDto } from 'src/app/core/models/resultado.encuesta.dto';
import { EncuestaService } from 'src/app/modules/encuesta/services/encuesta.service';
import { GraficoBarComponent } from 'src/app/shared/components/grafico-bar/grafico-bar.component';
import { CarreraService } from 'src/app/shared/services/carrera.service';

@Component({
  selector: 'app-ver-reporte',
  templateUrl: './ver-reporte.component.html',
  styleUrls: ['./ver-reporte.component.css'],
})
export class VerReporteComponent implements OnInit {
  @ViewChild('grafico') grafico: GraficoBarComponent;

  public mostar: boolean = false;
  private carreras: string[] = [];
  public encuestas: EncuestaDto[] = [];
  private idUser;
  private idEncuesta;

  //estadistica
  public mediaSi:number=0;
  public mediaNo:number=0;
  public mediaNunca:number=0;
  public mediaRaraVez:number=0;
  public mediaCasiSiempre:number=0;
  public mediaAlgunasVeces:number=0;
  public mediaSiempre:number=0;
  public mediaGeneral:number=0;
  public resultados: DataChar = {
    labels: [],
    datasets: [{ data: [], label: '' }],
  };
  public cronbatch:number =0;
  constructor(
    private encuestaService: EncuestaService,
    private carreraService: CarreraService,
    private cookie: CookieService
  ) {}

  verReporte() {
    this.obtenerEncuestadoService(this.idEncuesta);
    this.encuestaService.obtenerConstanteCronbatch(this.idEncuesta).subscribe(response=>{
      this.cronbatch =response;
    })
  }

  ngOnInit(): void {
    this.idUser = this.cookie.get('id');
    this.listarEncuetas();
    this.obtenerCarreras();
  }
  obtenerCarreras() {
    this.carreraService.getCarreras().subscribe((carreras) => {
      this.carreras = carreras;
    });
  }
  listarEncuetas() {
    this.encuestaService
      .obtenerEncuestas(this.idUser)
      .subscribe((encuestas) => {
        this.encuestas = encuestas;
      });
  }
  obtenerEncuestadoService(id) {
    this.mostar = false;
    this.encuestaService
      .obtenerResultadosPorEncuesta(id)
      .pipe(delay(300))
      .subscribe((response) => {
        this.mostar = true;
        this.setDatos(response);
        this.calcularValoresMedios(response);
        setTimeout(() => {
          this.grafico.barChartData = this.resultados;
        }, 300);
      });
  }
  obtenerResultados(event) {
    this.idEncuesta = event.target.value;
  }
  calcularValoresMedios(data: RespuestaItemDto[]){
    let total=0;
    data.forEach((valor:RespuestaItemDto)=>{
      total+= valor.total;
      switch(valor.descripcion){
        case 'No': 
          this.mediaNo = valor.total/data.length;
        break;
        case 'Si':
          this.mediaSi = valor.total/data.length;
        break;
        case 'Nunca':
          this.mediaNunca = valor.total/data.length;
        break;
        case 'Siempre':
          this.mediaSiempre = valor.total/data.length;
        break;
        case 'Rara vez':
          this.mediaRaraVez = valor.total/data.length;
        break;
        case 'Algunas veces':
          this.mediaAlgunasVeces = valor.total/data.length;
        break;
        case 'Casi siempre':
          this.mediaCasiSiempre = valor.total/data.length;
        break;
      }
    })
    this.mediaGeneral = total / data.length;
  }
  setDatos(data: RespuestaItemDto[]) {
    let valores = [];
    this.resultados.datasets['data'] = [];
    this.resultados.labels = [];
    data.forEach((resultado) => {
      valores.push(resultado.total);
      this.resultados.labels.push(resultado.descripcion);
    });
    this.resultados.datasets.push({
      data: valores,
      label: 'Total de respuesta por item',
    });
    this.resultados.datasets.shift();
  }
}
