// src/infrastructure/http/secretario/SecretarioController.ts

import { Request, Response } from "express";
import { CrearSecretario } from "../../../application/secretario/CrearSecretario";
import { ObtenerSecretario } from "../../../application/secretario/ObtenerSecretario";
import { ObtenerSecretarios } from "../../../application/secretario/ObtenerSecretarios";
import { ActualizarSecretario } from "../../../application/secretario/ActualizarSecretario";
import { EliminarSecretario } from "../../../application/secretario/EliminarSecretario";
import { SecretarioRepositoryImpl } from "../../persistence/secretario/SecretarioRepositoryImpl";
import { SecretarioNoEncontrado } from "../../../domain/secretario/exceptions/SecretarioNoEncontrado";
import { SecretarioYaExiste } from "../../../domain/secretario/exceptions/SecretarioYaExiste";

const repository = new SecretarioRepositoryImpl();

export class SecretarioController {
  async crear(req: Request, res: Response): Promise<void> {
    try {
      const secretario = await new CrearSecretario(repository).ejecutar(
        req.body,
      );
      res.status(201).json(secretario);
    } catch (error) {
      if (error instanceof SecretarioYaExiste) {
        res.status(409).json({ mensaje: error.message });
      } else {
        res.status(500).json({ mensaje: "Error interno del servidor" });
      }
    }
  }

  async obtenerPorId(req: Request, res: Response): Promise<void> {
    try {
      const secretario = await new ObtenerSecretario(repository).ejecutar(
        req.params.id as string,
      );
      res.status(200).json(secretario);
    } catch (error) {
      if (error instanceof SecretarioNoEncontrado) {
        res.status(404).json({ mensaje: error.message });
      } else {
        res.status(500).json({ mensaje: "Error interno del servidor" });
      }
    }
  }

  async obtenerTodos(req: Request, res: Response): Promise<void> {
    try {
      const secretarios = await new ObtenerSecretarios(repository).ejecutar();
      res.status(200).json(secretarios);
    } catch (error) {
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }

  async actualizar(req: Request, res: Response): Promise<void> {
    try {
      const secretario = await new ActualizarSecretario(repository).ejecutar(
        req.params.id as string,
        req.body,
      );
      res.status(200).json(secretario);
    } catch (error) {
      if (error instanceof SecretarioNoEncontrado) {
        res.status(404).json({ mensaje: error.message });
      } else {
        res.status(500).json({ mensaje: "Error interno del servidor" });
      }
    }
  }

  async eliminar(req: Request, res: Response): Promise<void> {
    try {
      await new EliminarSecretario(repository).ejecutar(
        req.params.id as string,
      );
      res.status(200).json({ mensaje: "Secretario eliminado correctamente" });
    } catch (error) {
      if (error instanceof SecretarioNoEncontrado) {
        res.status(404).json({ mensaje: error.message });
      } else {
        res.status(500).json({ mensaje: "Error interno del servidor" });
      }
    }
  }
}
