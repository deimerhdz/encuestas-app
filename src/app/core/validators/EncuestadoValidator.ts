import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { EncuestadoService } from "src/app/modules/encuestado/services/encuestado.service";
@Injectable({
    providedIn: 'root'
  })
export class EncuestadoValidator implements AsyncValidator{

    constructor(private encuestadoService: EncuestadoService) {
      
        
    }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      
      if(!control.value){
        return new Promise(null);
      }
        return this.encuestadoService.verificarEncuestado(control.value).pipe(
        map(resultado => {
        
            return (resultado ? {resultado: true} : null)}),
        catchError(()=> of(null))
      );
    }
}