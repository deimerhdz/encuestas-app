import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Encuestado } from 'src/app/core/models/encuestado.dto';
import { EncuestadoWithRespuestaDto } from 'src/app/core/models/encuestado.respuesta.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestadoService {
  private readonly url= environment.url;

  constructor(private http:HttpClient) { }

  public listarEncuestados(idEncuesta:number){
    return this.http.get<Encuestado[]>(`${this.url}/encuestado/listado/${idEncuesta}`);
  }

  public guardarRespuestas(encuesta:EncuestadoWithRespuestaDto){
    return this.http.post(`${this.url}/encuestado/guardar`,encuesta);
  }

  public verificarEncuestado(identificacion:string){
    return this.http.get(`${this.url}/encuestado/verificar/${identificacion}`);
  }
}
