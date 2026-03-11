// src/infrastructure/persistence/secretario/SecretarioPostgresRepository.ts

import { pool } from "../../../config/database";
import { SecretarioRepository } from "../../../domain/secretario/SecretarioRepository";
import { Secretario } from "../../../domain/secretario/Secretario";
import { SecretarioMapper } from "./SecretarioMapper";

export class SecretarioRepositoryImpl implements SecretarioRepository {
  async crear(secretario: Secretario): Promise<Secretario> {
    const result = await pool.query(
      `INSERT INTO secretarios 
        (id, rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, edad, dni, tipo_dni, direccion, telefono, estado, creado_en, actualizado_en)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING *`,
      [
        secretario.id,
        secretario.rol,
        secretario.primerNombre,
        secretario.segundoNombre,
        secretario.primerApellido,
        secretario.segundoApellido,
        secretario.edad,
        secretario.dni,
        secretario.tipoDni,
        secretario.direccion,
        secretario.telefono,
        secretario.estado,
        secretario.creadoEn,
        secretario.actualizadoEn,
      ],
    );
    return SecretarioMapper.toDomain(result.rows[0]);
  }

  async buscarPorId(id: string): Promise<Secretario | null> {
    const result = await pool.query(`SELECT * FROM secretarios WHERE id = $1`, [
      id,
    ]);
    if (result.rows.length === 0) return null;
    return SecretarioMapper.toDomain(result.rows[0]);
  }

  async buscarPorDni(dni: string): Promise<Secretario | null> {
    const result = await pool.query(
      `SELECT * FROM secretarios WHERE dni = $1`,
      [dni],
    );
    if (result.rows.length === 0) return null;
    return SecretarioMapper.toDomain(result.rows[0]);
  }

  async buscarTodos(): Promise<Secretario[]> {
    const result = await pool.query(
      `SELECT * FROM secretarios ORDER BY creado_en DESC`,
    );
    return result.rows.map(SecretarioMapper.toDomain);
  }

  async actualizar(secretario: Secretario): Promise<Secretario> {
    const result = await pool.query(
      `UPDATE secretarios SET
        primer_nombre = $1,
        segundo_nombre = $2,
        primer_apellido = $3,
        segundo_apellido = $4,
        edad = $5,
        dni = $6,
        tipo_dni = $7,
        direccion = $8,
        telefono = $9,
        estado = $10,
        actualizado_en = $11
       WHERE id = $12
       RETURNING *`,
      [
        secretario.primerNombre,
        secretario.segundoNombre,
        secretario.primerApellido,
        secretario.segundoApellido,
        secretario.edad,
        secretario.dni,
        secretario.tipoDni,
        secretario.direccion,
        secretario.telefono,
        secretario.estado,
        secretario.actualizadoEn,
        secretario.id,
      ],
    );
    return SecretarioMapper.toDomain(result.rows[0]);
  }

  async eliminar(id: string): Promise<void> {
    await pool.query(`DELETE FROM secretarios WHERE id = $1`, [id]);
  }
}
