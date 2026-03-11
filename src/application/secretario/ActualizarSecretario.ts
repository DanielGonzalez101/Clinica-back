// src/application/secretario/ActualizarSecretario.ts

import { SecretarioRepository } from "../../domain/secretario/SecretarioRepository";
import { Secretario } from "../../domain/secretario/Secretario";
import { SecretarioNoEncontrado } from "../../domain/secretario/exceptions/SecretarioNoEncontrado";
import { ActualizarSecretarioDto } from "./dto/ActualizarSecretarioDto";

export class ActualizarSecretario {
  constructor(private readonly repository: SecretarioRepository) {}

  async ejecutar(
    id: string,
    dto: ActualizarSecretarioDto,
  ): Promise<Secretario> {
    const secretario = await this.repository.buscarPorId(id);

    if (!secretario) {
      throw new SecretarioNoEncontrado(id);
    }

    const secretarioActualizado = new Secretario(
      secretario.id,
      secretario.rol,
      dto.primerNombre ?? secretario.primerNombre,
      dto.segundoNombre ?? secretario.segundoNombre,
      dto.primerApellido ?? secretario.primerApellido,
      dto.segundoApellido ?? secretario.segundoApellido,
      dto.edad ?? secretario.edad,
      dto.dni ?? secretario.dni,
      dto.tipoDni ?? secretario.tipoDni,
      dto.direccion ?? secretario.direccion,
      dto.telefono ?? secretario.telefono,
      dto.estado ?? secretario.estado,
      secretario.creadoEn,
      new Date(),
    );

    return await this.repository.actualizar(secretarioActualizado);
  }
}
