const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { roles, users } = require('../data/memoryDb');

let nextUserId = 1;

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      password,
      tipoPersona,
      area,
      telefono,
      disponibilidad,
    } = req.body;

    // Validaciones básicas
    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Verificar que no exista el email
    const existing = users.find((u) => u.email === email);
    if (existing) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Elegir el nombre de rol según tipoPersona
    let roleName = 'VOLUNTARIO';
    if (tipoPersona === 'SOCIO') roleName = 'SOCIO';
    if (tipoPersona === 'COORDINADOR') roleName = 'COORDINADOR';
    if (tipoPersona === 'ADMIN') roleName = 'ADMIN_ONG';

    const role = roles.find((r) => r.name === roleName);

    // Hashear password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: nextUserId++,
      nombre,
      apellido,
      email,
      password: hashedPassword,
      tipoPersona: tipoPersona || 'VOLUNTARIO',
      area: area || 'OTRO',
      telefono: telefono || '',
      disponibilidad: disponibilidad || '',
      roleName: role ? role.name : null,
    };

    users.push(newUser);

    return res.status(201).json({
      message: 'Persona registrada en la ONG correctamente',
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        email: newUser.email,
        tipoPersona: newUser.tipoPersona,
        area: newUser.area,
        role: newUser.roleName,
      },
    });
  } catch (error) {
    console.error('Error en register (memoria):', error);
    res.status(500).json({ error: 'Error al registrar persona' });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.roleName },
      process.env.JWT_SECRET || 'secretito',
      { expiresIn: '8h' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        tipoPersona: user.tipoPersona,
        area: user.area,
        role: user.roleName,
      },
    });
  } catch (error) {
    console.error('Error en login (memoria):', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = { register, login };
