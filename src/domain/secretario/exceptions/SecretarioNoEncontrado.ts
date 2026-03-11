// src/domain/secretario/exceptions/SecretarioNoEncontrado.ts

export class SecretarioNoEncontrado extends Error {
  constructor(id: string) {
    super(`Secretario con id ${id} no encontrado`);
    this.name = "SecretarioNoEncontrado";
  }
}
