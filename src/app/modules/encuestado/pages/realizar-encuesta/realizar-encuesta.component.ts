import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestaDto } from 'src/app/core/models/encuesta.dto';
import { EncuestaService } from 'src/app/modules/encuesta/services/encuesta.service';
import { EncuestadoService } from '../../services/encuestado.service';

@Component({
  selector: 'app-realizar-encuesta',
  templateUrl: './realizar-encuesta.component.html',
  styleUrls: ['./realizar-encuesta.component.css']
})
export class RealizarEncuestaComponent implements OnInit {

  public encuesta:EncuestaDto ={
    titulo:'',
    descripcion:'',

  };
  
  formEncuestado:FormGroup = new FormGroup({
    encuestado: new FormGroup({
      identificacion: new FormControl('',Validators.required),
      nombre:new FormControl('',Validators.required),
      carrera:new FormControl('',Validators.required),
      idEncuesta: new FormControl('',Validators.required),
      email:new FormControl('',Validators.required)
    }),
    respuestas: new FormArray([])
  });
  //Variable para manejar el control del formulario de pasos
  public step: number = 1;

  private hash:string =''

  formSubmit:boolean = false;

  constructor(
    private encuestaService:EncuestaService,
    private activateRouter:ActivatedRoute,
    private encuestadoService:EncuestadoService,
    private router:Router) { 
    this.hash = this.activateRouter.snapshot.params['hash'];
  }

  ngOnInit(): void {
    this.obtenerEncuesta();

    
  }
  get respuestas(){
    return this.formEncuestado.get('respuestas') as FormArray;
  }
  //se guardar las repuestas 
  guardarRespuesta(pregunta:any,respuesta:any){
    //Si el usuario cambia la opcion de una pregunta se actualiza el valor para evitar respuestas duplicadas
    //si no se puede actualizar entonces no existen duplicados y se procede a agregar una nueva respuesta
    if(!this.actualizarRespuesta(this.respuestas.value,pregunta,'opcion',respuesta) ){
      this.respuestas.push(new FormGroup({ idPregunta: new FormControl(pregunta), opcion: new FormControl(respuesta)}))
    }
  }
  obtenerEncuesta(){
    this.encuestaService.obtenerEncuestasPorhash(this.hash).subscribe(encuesta=>{
      this.encuesta = encuesta;
      this.formEncuestado.controls['encuestado'].get('idEncuesta')!.setValue(encuesta.id)
    })
  }
  enviarEncuesta(){
    if(this.step<=2){
      if(this.formEncuestado.controls['encuestado'].invalid && this.step == 1){
        this.formSubmit = true;
        return;
      }
      if(this.step ==2){
        this.encuestadoService.guardarRespuestas(this.formEncuestado.value).subscribe(response=>{
            if(response){
              this.router.navigateByUrl('/realizar-encuesta/finalizado')
            }
        })
      }else{
        this.step = this.step + 1;
      }
    }
  }
  
  radioChangeHandler(event, idPregunta){
    let respuesta = event.target.value;
    this.guardarRespuesta(idPregunta,respuesta);
  }
  
  validarCampoGeneral(campo:string): boolean {
    if(this.formEncuestado.controls['encuestado'].get(campo)!.invalid && this.formSubmit){
      return true;
    }else{
      return false;
    }
  }

 actualizarRespuesta(respuestas:any[], idPregunta:any, propiedad:any, nuevoValor:any) {

  const elementoEncontrado = respuestas.find(item =>{
    return item.idPregunta == idPregunta;
  });
  if(elementoEncontrado != undefined){
    elementoEncontrado[propiedad] = nuevoValor;
    return true;
  }else{
    return false;
  }
}
}
