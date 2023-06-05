import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncuestaService } from '../../services/encuesta.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-agregar-encuesta',
  templateUrl: './agregar-encuesta.component.html',
  styleUrls: ['./agregar-encuesta.component.css']
})
export class AgregarEncuestaComponent implements OnInit {
  encuestaForm:FormGroup = new FormGroup({
    titulo: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    idUsuario: new FormControl(''),
    fechaFinal: new FormControl('',Validators.required)
  })
  constructor(private encuestaService:EncuestaService,private router:Router,
    private cookie:CookieService) { }

  ngOnInit(): void {
    let id = parseInt(this.cookie.get('id'));
    this.encuestaForm.get('idUsuario')?.setValue(id);
  }

  guardarEncuesta(){
    this.encuestaService.guardarEncuesta(this.encuestaForm.value).subscribe(response=>{
      if(response){
        this.router.navigateByUrl('/home/encuestas');
      }
    })
  }
}
