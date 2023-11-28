import { OpcionDto } from "./opcion.dto";

export interface PreguntaDto{
    titulo:string,
    idEncuesta:number,
    idTipoPregunta:number,
    generarScala:boolean,
    opciones?:OpcionDto[],
    codigo?:number,
}