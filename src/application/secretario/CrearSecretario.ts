// src/application/secretario/CrearSecretario.ts

import { SecretarioRepository } from "../../domain/secretario/SecretarioRepository";
import { Secretario } from "../../domain/secretario/Secretario";
import { SecretarioYaExiste } from "../../domain/secretario/exceptions/SecretarioYaExiste";
import { CrearSecretarioDto } from "./dto/CrearSecretarioDto";
import { randomUUID } from "crypto";

export class CrearSecretario {
  constructor(private readonly repository: SecretarioRepository) {}

  async ejecutar(dto: CrearSecretarioDto): Promise<Secretario> {
    const secretarioExistente = await this.repository.buscarPorDni(dto.dni);

    if (secretarioExistente) {
      throw new SecretarioYaExiste(dto.dni);
    }

    const secretario = new Secretario(
      randomUUID(),
      dto.rol,
      dto.primerNombre,
      dto.segundoNombre ?? null,
      dto.primerApellido,
      dto.segundoApellido ?? null,
      dto.edad,
      dto.dni,
      dto.tipoDni,
      dto.direccion,
      dto.telefono,
      "activo",
      new Date(),
      new Date(),
    );

    return await this.repository.crear(secretario);
  }
}
