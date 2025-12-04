const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

// Registro de usuario
async function registerUser({ nombre, email, password, rol }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, email, hashedPassword, rol || 'voluntario']
  );

  return result.rows[0];
}

// Login de usuario
async function loginUser({ email, password }) {
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user) throw new Error('Usuario no encontrado');

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error('Contraseña incorrecta');

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  return { token, user };
}

module.exports = { registerUser, loginUser };
