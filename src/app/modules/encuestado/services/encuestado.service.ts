import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncuestadoWithRespuestaDto } from 'src/app/core/models/encuestado.respuesta.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestadoService {
  private readonly url= environment.url;

  constructor(private http:HttpClient) { }

  guardarRespuestas(encuesta:EncuestadoWithRespuestaDto){
    return this.http.post(`${this.url}/encuestado/guardar`,encuesta);
  }
}
