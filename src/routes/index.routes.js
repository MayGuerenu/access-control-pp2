// src/routes/index.routes.js
const express = require('express');
const router = express.Router();

const roleRoutes = require('./role.routes');
const authRoutes = require('./auth.routes');
const permissionRoutes = require('./permission.routes'); //importante

router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes); //acá usamos el router

module.exports = router;
