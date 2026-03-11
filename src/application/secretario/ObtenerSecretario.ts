// src/application/secretario/ObtenerSecretario.ts

import { SecretarioRepository } from "../../domain/secretario/SecretarioRepository";
import { Secretario } from "../../domain/secretario/Secretario";
import { SecretarioNoEncontrado } from "../../domain/secretario/exceptions/SecretarioNoEncontrado";

export class ObtenerSecretario {
  constructor(private readonly repository: SecretarioRepository) {}

  async ejecutar(id: string): Promise<Secretario> {
    const secretario = await this.repository.buscarPorId(id);

    if (!secretario) {
      throw new SecretarioNoEncontrado(id);
    }

    return secretario;
  }
}
