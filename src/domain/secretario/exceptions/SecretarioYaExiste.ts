export class SecretarioYaExiste extends Error {
  constructor(dni: string) {
    super(`Ya existe un secretario con el dni ${dni}`);
    this.name = "SecretarioYaExiste";
  }
}
