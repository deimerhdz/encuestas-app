import { Component, OnInit, ViewChild } from '@angular/core';
import { response } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'rxjs';
import { DataChar, Data } from 'src/app/core/models/data.char.dto';
import { EncuestaDto } from 'src/app/core/models/encuesta.dto';
import { Encuestado } from 'src/app/core/models/encuestado.dto';
import { MediaItemDto } from 'src/app/core/models/media-item.dto';
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
  public mediaItem:MediaItemDto[] = [];
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
    this.encuestaService.obtenerResultadosPorPregunta(this.idEncuesta).subscribe(response=>{
      this.mediaItem = response;
      this.calcularValoresMedios(response)
      console.log(response);
      
    })
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
       
        setTimeout(() => {
          this.grafico.barChartData = this.resultados;
        }, 300);
      });
  }
  obtenerResultados(event) {
    this.idEncuesta = event.target.value;
  }
  calcularValoresMedios(data: MediaItemDto[]){
    let mediatotal =0;
    data.forEach(item => {
      mediatotal+=(item.suma/item.numeroPregunta)
    })

    this.mediaGeneral = mediatotal/data.length;
      
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
