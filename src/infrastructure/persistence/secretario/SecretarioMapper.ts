// src/infrastructure/persistence/secretario/SecretarioMapper.ts

import { Secretario } from "../../../domain/secretario/Secretario";

export class SecretarioMapper {
  static toDomain(row: any): Secretario {
    return new Secretario(
      row.id,
      row.rol,
      row.primer_nombre,
      row.segundo_nombre,
      row.primer_apellido,
      row.segundo_apellido,
      row.edad,
      row.dni,
      row.tipo_dni,
      row.direccion,
      row.telefono,
      row.email,
      row.password,
      row.estado,
      row.creado_en,
      row.actualizado_en,
    );
  }
}
