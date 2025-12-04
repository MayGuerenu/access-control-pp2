const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes.js');
const actividadRoutes = require('./actividad.routes.js');

router.use('/auth', authRoutes);
router.use('/actividades', actividadRoutes);

module.exports = router;
