const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // conexión a Supabase/Postgres
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // para manejar tokens

// Middleware para verificar token
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // formato: "Bearer token"

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guarda info del usuario en req.user
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

// Ruta de registro
router.post('/register', async (req, res) => {
  const { nombre, apellido, email, password, tipoPersona, area, telefono, disponibilidad } = req.body;

  try {
    // Verificar si el email ya existe
    const existingUser = await pool.query(
      `SELECT id FROM usuarios WHERE email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    //  Encriptar contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    const result = await pool.query(
      `INSERT INTO usuarios 
      (nombre, apellido, email, "hash de contraseña", tipo_persona, area, telefono, disponibilidad) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [nombre, apellido, email, hashedPassword, tipoPersona, area, telefono, disponibilidad]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al registrar usuario:', err.message);
    res.status(500).json({ error: err.message });
  }
});


// Ruta de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM usuarios WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user["hash de contraseña"]);

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign(
  { id: user.id, tipoPersona: user.tipo_persona },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        tipoPersona: user.tipo_persona,
        area: user.area,
        telefono: user.telefono,
        disponibilidad: user.disponibilidad
      }
    });
  } catch (err) {
    console.error('Error al iniciar sesión:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Ruta de perfil del usuario logueado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, nombre, apellido, email, tipo_persona, area, telefono, disponibilidad
       FROM usuarios WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error en /me:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Ruta para listar todos los usuarios (solo ADMIN o COORDINADOR)
router.get('/users', authMiddleware, async (req, res) => {
  try {
    // Verificar rol del usuario
    if (req.user.tipoPersona !== 'ADMIN' && req.user.tipoPersona !== 'COORDINADOR') {
      return res.status(403).json({ error: 'No tenés permisos para ver esta información' });
    }

    const result = await pool.query(
      `SELECT id, nombre, apellido, email, tipo_persona, area, telefono, disponibilidad
       FROM usuarios ORDER BY id ASC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error al listar usuarios:', err.message);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
