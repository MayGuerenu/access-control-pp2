const authService = require('../services/auth.service');

async function register(req, res) {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);  
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { register, login };