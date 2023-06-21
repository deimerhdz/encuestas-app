import { Injectable } from '@angular/core';

import  datos from '../../core/data/carreras.json';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor() { }

  getCarreras():any{
    let carreras =datos.carerras
    return of(carreras);
  }
}
