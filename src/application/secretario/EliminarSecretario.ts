// src/application/secretario/EliminarSecretario.ts

import { SecretarioRepository } from "../../domain/secretario/SecretarioRepository";
import { SecretarioNoEncontrado } from "../../domain/secretario/exceptions/SecretarioNoEncontrado";

export class EliminarSecretario {
  constructor(private readonly repository: SecretarioRepository) {}

  async ejecutar(id: string): Promise<void> {
    const secretario = await this.repository.buscarPorId(id);

    if (!secretario) {
      throw new SecretarioNoEncontrado(id);
    }

    await this.repository.eliminar(id);
  }
}
