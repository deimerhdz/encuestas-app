import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncuestaService } from '../../services/encuesta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntasService } from '../../services/preguntas.service';
import { combineLatest } from 'rxjs';
import { EncuestaDto } from 'src/app/core/models/encuesta.dto';
import { PreguntaDto } from 'src/app/core/models/pregunta.dto';
import Swal from 'sweetalert2';
import { OpcionService } from '../../services/opcion.service';
import { OpcionDto } from 'src/app/core/models/opcion.dto';

@Component({
  selector: 'app-editar-encuesta',
  templateUrl: './editar-encuesta.component.html',
  styleUrls: ['./editar-encuesta.component.css'],
})
export class EditarEncuestaComponent implements OnInit {
  pregunta: string = '';

  idPregunta: any = 0;

  encuestaForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    idUsuario: new FormControl(''),
    fechaFinal: new FormControl('', Validators.required),
  });

  private id: any;

  public preguntas: PreguntaDto[] = [];

  public opciones: OpcionDto[] = [];
  constructor(
    private encuestaService: EncuestaService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private preguntaService: PreguntasService,
    private opcionService: OpcionService
  ) {}

  ngOnInit(): void {
    this.id = this.activateRouter.snapshot.params['id'];
    this.getEncuesta(this.id);
  }
  getEncuesta(id: any) {
    combineLatest([
      this.encuestaService.obtenerEncuestasPorId(id),
      this.preguntaService.obtenerPreguntas(id),
    ]).subscribe(([encuesta, preguntas]) => {
      this.consutruirEncuesta(encuesta);
      this.preguntas = preguntas;
    });
  }
  guardarEncuesta() {
    this.encuestaService
      .guardarEncuesta(this.encuestaForm.value)
      .subscribe((response) => {
        if (response) {
          this.router.navigateByUrl('/home/encuestas');
        }
      });
  }

  consutruirEncuesta(encuesta: EncuestaDto) {
    this.encuestaForm.get('id')?.setValue(encuesta.id);
    this.encuestaForm.get('titulo')?.setValue(encuesta.titulo);
    this.encuestaForm.get('descripcion')?.setValue(encuesta.descripcion);
    this.encuestaForm.get('fechaFinal')?.setValue(encuesta.fechaFinal);
  }

  agregarPregunta() {
    Swal.fire({
      title: 'Nombre de la pregunta',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      showLoaderOnConfirm: true,
      preConfirm: (titulo) => {
        return titulo;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value.length == 0) {
          Swal.fire('Error!', 'El campo no puede estar vacio!', 'error');
        } else {
          this.preguntaService
            .guardarPregunta({
              titulo: result.value,
              idEncuesta: this.id,
              idTipoPregunta: 1,
            })
            .subscribe((response) => {
              if (response) {
                this.getEncuesta(response.idEncuesta);
              }
            });
        }
      }
    });
  }

  eliminarPregunta(id: any) {
    this.preguntaService.eliminarPregunta(id).subscribe((response) => {
      if (response) {
        this.getEncuesta(this.id);
      }
    });
  }

  editarPregunta(pregunta: PreguntaDto) {
    this.pregunta = `¿${pregunta.titulo}?`;
    this.idPregunta = pregunta.codigo;
    this.listarOpciones(this.idPregunta);
  }

  agregarOpcion() {
    Swal.fire({
      title: 'Opcion',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      showLoaderOnConfirm: true,
      preConfirm: (titulo) => {
        return titulo;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value.length == 0) {
          Swal.fire('Error!', 'El campo no puede estar vacio!', 'error');
        } else {
          this.opcionService
            .guardarOpcion({ valor: result.value, idPregunta: this.idPregunta })
            .subscribe((response) => {
              if (response) {
                this.listarOpciones(this.idPregunta);
              }
            });
        }
      }
    });
  }

  listarOpciones(idPregunta: any) {
    this.opcionService.listarOpciones(idPregunta).subscribe((opciones) => {
      this.opciones = opciones;
    });
  }

  eliminarOpcion(id:any){
    this.opcionService.eliminarOpcion(id).subscribe(response=>{
      this.listarOpciones(this.idPregunta);
    })
  }
}
