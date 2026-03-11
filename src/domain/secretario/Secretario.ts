export class Secretario {
  constructor(
    public id: string,
    public rol: string,
    public primerNombre: string,
    public segundoNombre: string | null,
    public primerApellido: string,
    public segundoApellido: string | null,
    public edad: number,
    public dni: string,
    public tipoDni: string,
    public direccion: string,
    public telefono: string,
    public estado: string,
    public creadoEn: Date,
    public actualizadoEn: Date
  ) {}
}
