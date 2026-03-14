// src/application/secretario/dto/CrearSecretarioDto.ts

export interface CrearSecretarioDto {
  rol: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  edad: number;
  dni: string;
  tipoDni: string;
  direccion: string;
  telefono: string;
  email: string;
  password: string;
}
