const { registerUser, loginUser } = require('../services/auth.service');

// Registro
async function register(req, res) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado con éxito', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Login
async function login(req, res) {
  try {
    const { token, user } = await loginUser(req.body);
    res.json({ message: 'Login exitoso', token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = { register, login };
