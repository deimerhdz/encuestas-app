import { PreguntaDto } from "./pregunta.dto"

export interface EncuestaDto{
    id?:number,
    titulo:string,
    descripcion:string,
    hash?:string
    fechaRegistro?:Date,
    preguntas?:PreguntaDto[],
    idUsuario:number,
    estado:boolean
    fechaFinal:string
}