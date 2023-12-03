
import { Encuestado } from "./encuestado.dto";
import { Respuesta } from "./respuesta.dto";

export interface EncuestadoWithRespuestaDto{
      encuestado:Encuestado;
      idEncuesta:number;
      respuestas:Respuesta[];
}