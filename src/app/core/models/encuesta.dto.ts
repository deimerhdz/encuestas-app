export interface EncuestaDto{
    id?:number,
    titulo:string,
    descripcion:string,
    fechaRegistro?:Date,
    idUsuario:number,
    estado:boolean
    fechaFinal:string
}