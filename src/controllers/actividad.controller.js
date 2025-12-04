const { crearActividad } = require('../services/actividad.service');

async function postActividad(req, res) {
  try {
    const nuevaActividad = await crearActividad({ ...req.body, usuario_id: req.userId });
    res.status(201).json(nuevaActividad);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear actividad' });
  }
}

module.exports = { postActividad };
