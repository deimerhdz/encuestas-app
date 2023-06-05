import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../../services/encuesta.service';
import { EncuestaDto } from 'src/app/core/models/encuesta.dto';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-listado-encuesta',
  templateUrl: './listado-encuesta.component.html',
  styleUrls: ['./listado-encuesta.component.css']
})
export class ListadoEncuestaComponent implements OnInit {
  public encuestas:EncuestaDto [] =[];
  constructor(
    private encuestaService:EncuestaService,
    private router:Router,
    private cookie:CookieService
    ) { }

  ngOnInit(): void {
    this.obtenerEncuestas();
  }

  obtenerEncuestas(){
    let id = parseInt(this.cookie.get('id'));
    this.encuestaService.obtenerEncuestas(id).subscribe(response=>{
     this.encuestas = response;
      
    })
  }

  publicarEncuesta(id:any){
    this.encuestaService.publicarEncuesta(id).subscribe(response=>{
      this.obtenerEncuestas();
    })
  }
  editarEncuesta(id:any){
    this.router.navigateByUrl('/home/encuestas/editar-encuesta/'+id);
  }

  verEncuesta(hash:any){
    this.router.navigateByUrl('/home/encuestas/ver-encuesta/'+hash);
  }
  eliminarEncuesta(id:any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Estos cambios no podran ser revertidos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.encuestaService.eliminarEncuesta(id).subscribe(response=>{
          this.obtenerEncuestas();
          Swal.fire(
            'Deleted!',
            'El registro ha sido eliminado.',
            'success'
          )
        })
       
      }
    })
    
  }

}
