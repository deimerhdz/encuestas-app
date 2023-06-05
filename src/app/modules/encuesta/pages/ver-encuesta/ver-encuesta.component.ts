import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../../services/encuesta.service';
import { EncuestaDto } from 'src/app/core/models/encuesta.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-encuesta',
  templateUrl: './ver-encuesta.component.html',
  styleUrls: ['./ver-encuesta.component.css']
})
export class VerEncuestaComponent implements OnInit {
  public encuestaDto!:EncuestaDto;
  public hash:any;
  constructor(private encuestaService:EncuestaService,private activateRoute:ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.hash = this.activateRoute.snapshot.params['hash'];
    this.obtenerEncuesta(this.hash);
  }

  obtenerEncuesta(hash:any){
    this.encuestaService.obtenerEncuestasPorhash(hash).subscribe(encuesta=>{

      this.encuestaDto = encuesta;
      
    })
  }

}
