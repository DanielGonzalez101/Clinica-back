// src/infrastructure/http/secretario/SecretarioRouter.ts

import { Router } from "express";
import { SecretarioController } from "./SecretarioController";

const router = Router();
const controller = new SecretarioController();

router.post("/", (req, res) => controller.crear(req, res));
router.get("/", (req, res) => controller.obtenerTodos(req, res));
router.get("/:id", (req, res) => controller.obtenerPorId(req, res));
router.put("/:id", (req, res) => controller.actualizar(req, res));
router.delete("/:id", (req, res) => controller.eliminar(req, res));

export default router;
