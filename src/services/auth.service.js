const supabase = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser({ user, email, password }) {
  if (!user || user.length < 2) throw new Error('Nombre inválido');
  if (!email || !email.includes('@')) throw new Error('Email inválido');
  if (!password || password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres');

  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync(password, salt);

  const { data, error } = await supabase
    .from('users')
    .insert({
      user,
      email,
      password_hash,
      role_id: 2  // por defecto usuario común
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') throw new Error('El email ya está registrado');
    throw error;
  }

  return { id: data.id, user: data.user, email: data.email };
}

async function login(email, password) {
  if (!email || !password) throw new Error('Email y contraseña requeridos');

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    throw new Error('Credenciales inválidas');
  }

  const match = bcrypt.compareSync(password, user.password_hash);
  if (!match) throw new Error('Credenciales inválidas');

  const payload = { id: user.id, email: user.email, role_id: user.role_id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { token, user: payload };
}

module.exports = { registerUser, login };