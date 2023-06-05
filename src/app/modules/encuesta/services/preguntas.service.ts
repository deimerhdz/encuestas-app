import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreguntaDto } from 'src/app/core/models/pregunta.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  private readonly url = environment.url;
  constructor(private http:HttpClient) { }

  obtenerPreguntas(idEncuesta:any){
    return this.http.get<PreguntaDto[]>(`${this.url}/preguntas/listar/${idEncuesta}`);
  }

  guardarPregunta(pregunta:PreguntaDto){
    return this.http.post<PreguntaDto>(`${this.url}/preguntas/guardar/`,pregunta);
  }

  eliminarPregunta(id:number){
    return this.http.delete(`${this.url}/preguntas/eliminar/${id}`);
  }
}
