// src/routes/role.routes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const auth = require('../middlewares/auth.middleware');

// Todas las rutas de roles protegidas con JWT
router.get('/', auth, roleController.list);
router.get('/:id', auth, roleController.getOne);
router.post('/', auth, roleController.create);
router.put('/:id', auth, roleController.update);
router.delete('/:id', auth, roleController.remove);

module.exports = router;