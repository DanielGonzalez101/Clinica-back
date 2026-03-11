import { Secretario } from "./Secretario";

export interface SecretarioRepository {
  crear(secretario: Secretario): Promise<Secretario>;
  buscarPorId(id: string): Promise<Secretario | null>;
  buscarTodos(): Promise<Secretario[]>;
  buscarPorDni(dni: string): Promise<Secretario | null>;
  actualizar(secretario: Secretario): Promise<Secretario>;
  eliminar(id: string): Promise<void>;
}
