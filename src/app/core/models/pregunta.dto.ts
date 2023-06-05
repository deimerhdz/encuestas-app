import { OpcionDto } from "./opcion.dto";

export interface PreguntaDto{
    titulo:string,
    idEncuesta:number,
    idTipoPregunta:number,
    opciones?:OpcionDto[],
    codigo?:number,
}