// src/main.ts

import app from "./infrastructure/http/server";
import { connectDB } from "./config/database";

const PORT = process.env.PORT || 3000;

const main = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

main();
