import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncuestaDto } from 'src/app/core/models/encuesta.dto';
import { environment } from 'src/environments/environment';
import moment from 'moment';
import { ResultadoEncuestaDto } from 'src/app/core/models/resultado.encuesta.dto';
import { Grupo } from 'src/app/core/models/grupo.dto';
import { group } from '@angular/animations';
import { RespuestaItemDto } from 'src/app/core/models/respuesta.item.dto';
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
  public obtenerEncuestasPorhash(hash:any){
    return this.http.get<EncuestaDto>(`${this.url}/encuestas/encuesta/${hash}`);
  }

  public guardarEncuesta(encuesta:EncuestaDto){
    if(encuesta.grupos.length>0){
      let grupos = this.convertirGrupos(encuesta.grupos);
      encuesta.grupos = grupos;
    }
  
    encuesta.fechaFinal =  moment(encuesta.fechaFinal).format('Y-MM-DD HH:mm')

    return this.http.post(`${this.url}/encuestas/guardar`,encuesta);
  }

  public actualizarEncuesta(encuesta:EncuestaDto){
    if(encuesta.grupos.length>0){
      let grupos = this.convertirGrupos(encuesta.grupos);
      encuesta.grupos = grupos;
    }
    encuesta.fechaFinal =  moment(encuesta.fechaFinal).format('Y-MM-DD HH:mm')
    return this.http.put(`${this.url}/encuestas/actualizar/${encuesta.id}`,encuesta);
  }

  public publicarEncuesta(id:number){
    return this.http.put(`${this.url}/encuestas/publicar/${id}`,null);
  }

  public eliminarEncuesta(id:number){
    return this.http.delete(`${this.url}/encuestas/eliminar/${id}`);
  }

  public obtenerResultadosPorEncuesta(id:number){
    return this.http.get<RespuestaItemDto[]>(`${this.url}/respuestas/resumen-por-opciones/${id}`);
  }
  public obtenerConstanteCronbatch(id:number){
    return this.http.get<number>(`${this.url}/respuestas/constante-cronbach/${id}`);
  }
  private convertirGrupos(grupos:any[]){
    return grupos.map(grupo=> new Grupo(grupo));
  }
}
