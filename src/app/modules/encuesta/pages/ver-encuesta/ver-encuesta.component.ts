import { Component, Inject, OnInit } from '@angular/core';
import { EncuestaService } from '../../services/encuesta.service';
import { EncuestaDto } from 'src/app/core/models/encuesta.dto';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

import { Clipboard } from '@angular/cdk/clipboard';
import { DOCUMENT, Location } from '@angular/common';
@Component({
  selector: 'app-ver-encuesta',
  templateUrl: './ver-encuesta.component.html',
  styleUrls: ['./ver-encuesta.component.css']
})
export class VerEncuestaComponent implements OnInit {
  public encuestaDto!:EncuestaDto;
  public hash:any;

  public copy:boolean=false;
  constructor(
    private encuestaService:EncuestaService,
    private activateRoute:ActivatedRoute,
    private clipboard: Clipboard,

    @Inject(DOCUMENT) document: any
    ) {
    
   }

   cerrar(){
    this.copy=false;
   }

  ngOnInit(): void {
    this.hash = this.activateRoute.snapshot.params['hash'];
    this.obtenerEncuesta(this.hash);
   
    
  }

  copiar(){
    let url = this.obtenerUrl();
    this.copy= true;
   this.clipboard.copy(`${url}/realizar-encuesta/${this.encuestaDto.hash}`);
  }

  obtenerEncuesta(hash:any){
    this.encuestaService.obtenerEncuestasPorhash(hash).subscribe(encuesta=>{

      this.encuestaDto = encuesta;
      
    })
  }

  obtenerUrl(){
    let url = document.location.href.split('/');
   

    return url[0]+'//'+url[2];
  }

}
