const express = require('express');
const router = express.Router();

const roleRoutes = require('./role.routes');
const authRoutes = require('./auth.routes');

router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);

module.exports = router;