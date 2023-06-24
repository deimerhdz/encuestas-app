import { Grupo } from "./grupo.dto"
import { PreguntaDto } from "./pregunta.dto"

export interface EncuestaDto{
    id?:number,
    titulo:string,
    descripcion:string,
    hash?:string
    fechaRegistro?:Date,
    preguntas?:PreguntaDto[],
    grupos?:Grupo[],
    idUsuario?:number,
    estado?:boolean
    fechaFinal?:string
}