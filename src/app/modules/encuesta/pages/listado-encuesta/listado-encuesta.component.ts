import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EncuestaService } from '../../services/encuesta.service';
import { EncuestaDto } from 'src/app/core/models/encuesta.dto';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-listado-encuesta',
  templateUrl: './listado-encuesta.component.html',
  styleUrls: ['./listado-encuesta.component.css']
})
export class ListadoEncuestaComponent implements OnInit,AfterViewInit {
  public encuestas:EncuestaDto [] =[];
  private id:any;
  constructor(
    private encuestaService:EncuestaService,
    private router:Router,
    private cookie:CookieService
    ) { 
    
   
      
    }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.id = this.cookie.get('id');
      console.log(this.id);
      this.obtenerEncuestas();
    },200)
   
  }

  ngOnInit(): void {
 
 
  }

  obtenerEncuestas(){
    this.encuestaService.obtenerEncuestas(this.id).subscribe(response=>{
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
