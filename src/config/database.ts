// src/infrastructure/config/database.ts

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const connectDB = async (): Promise<void> => {
  try {
    await pool.connect();
    console.log("✅ Conectado a PostgreSQL - Supabase");
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
    process.exit(1);
  }
};
