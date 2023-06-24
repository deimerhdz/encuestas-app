import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Encuestado } from 'src/app/core/models/encuestado.dto';
import { EncuestadoService } from 'src/app/modules/encuestado/services/encuestado.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  public encuestados:Encuestado[]=[];
  private idEncuesta:number=0;

  constructor(private encuestadoService:EncuestadoService,private activateRouter:ActivatedRoute ) {
    this.idEncuesta = parseInt(this.activateRouter.snapshot.params['id']);
   }

  ngOnInit(): void {
    this.obtenerListaDeEncuestados();
  }


  obtenerListaDeEncuestados(){
    
    this.encuestadoService.listarEncuestados(this.idEncuesta).subscribe(response=>{
      this.encuestados = response;
    })
  }
}
