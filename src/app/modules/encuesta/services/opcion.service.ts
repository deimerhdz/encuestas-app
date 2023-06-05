import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpcionDto } from 'src/app/core/models/opcion.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpcionService {
  private readonly url = environment.url;
  constructor(private http:HttpClient) { }

  public listarOpciones(id:any){
    return this.http.get<OpcionDto[]>(`${this.url}/opciones/listar/${id}`)
  }
  public guardarOpcion(opcion:OpcionDto){
    return this.http.post(`${this.url}/opciones/guardar`,opcion);
  }

  public eliminarOpcion(id:number){
    return this.http.delete(`${this.url}/opciones/eliminar/${id}`)
  }
}
