const pool = require('../config/db');

async function crearActividad(data) {
  const { titulo, descripcion, fecha, usuario_id } = data;
  const result = await pool.query(
    'INSERT INTO actividades (titulo, descripcion, fecha, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [titulo, descripcion, fecha, usuario_id]
  );
  return result.rows[0];
}

// Agregá funciones para listar, editar, eliminar...

module.exports = { crearActividad };
