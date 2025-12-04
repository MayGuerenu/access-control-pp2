const express = require('express');
const router = express.Router();
const { postActividad } = require('../controllers/actividad.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.post('/', verifyToken, postActividad);
// Agregá GET, PUT, DELETE...

module.exports = router;