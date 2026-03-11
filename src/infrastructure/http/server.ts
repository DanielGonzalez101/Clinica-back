// src/infrastructure/http/server.ts

import express from "express";
import SecretarioRouter from "./secretario/SecretarioRouter";

const app = express();

app.use(express.json());

// Rutas
app.use("/api/secretarios", SecretarioRouter);

export default app;
