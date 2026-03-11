// src/application/secretario/ObtenerSecretarios.ts

import { SecretarioRepository } from "../../domain/secretario/SecretarioRepository";
import { Secretario } from "../../domain/secretario/Secretario";

export class ObtenerSecretarios {
  constructor(private readonly repository: SecretarioRepository) {}

  async ejecutar(): Promise<Secretario[]> {
    return await this.repository.buscarTodos();
  }
}
