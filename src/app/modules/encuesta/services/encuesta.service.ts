import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncuestaDto } from 'src/app/core/models/encuesta.dto';
import { environment } from 'src/environments/environment';
import moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  private readonly url = environment.url;

  constructor(private http:HttpClient) { }

  public obtenerEncuestas(idUsuario:number){
    return this.http.get<EncuestaDto[]>(`${this.url}/encuestas/listar/${idUsuario}`);
  }

  public obtenerEncuestasPorId(id:number){
    return this.http.get<EncuestaDto>(`${this.url}/encuestas/obtener-por-id/${id}`);
  }

  public guardarEncuesta(encuesta:EncuestaDto){
    
    encuesta.fechaFinal =  moment(encuesta.fechaFinal).format('Y-MM-DD HH:mm')

    return this.http.post(`${this.url}/encuestas/guardar`,encuesta);
  }

  public actualizarEncuesta(encuesta:EncuestaDto){
    return this.http.put(`${this.url}/encuestas/actualizar/${encuesta.id}`,encuesta);
  }

  public publicarEncuesta(id:number){
    return this.http.put(`${this.url}/encuestas/publicar/${id}`,null);
  }

  public eliminarEncuesta(id:number){
    return this.http.delete(`${this.url}/encuestas/eliminar/${id}`);
  }
}
