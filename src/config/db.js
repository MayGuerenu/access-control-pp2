const { Pool } = require('pg');
require('dotenv').config();

// Configuración de conexión a Supabase/Postgres
const pool = new Pool({
  connectionString: process.env.SUPABASE_URL, // debe estar en el archivo .env
  ssl: { rejectUnauthorized: false } // necesario para conexiones seguras en la nube
});

// Exportamos el pool para usarlo en servicios y controladores
module.exports = pool;

