const { Router } = require('express');
const authRoutes = require('./auth.routes');
const roleRoutes = require('./role.routes');
const permissionRoutes = require('./permission.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);

// dependiendo de cómo lo llame el front, cubrimos ambos:
router.use('/permisos', permissionRoutes);
router.use('/permissions', permissionRoutes);

module.exports = router;
