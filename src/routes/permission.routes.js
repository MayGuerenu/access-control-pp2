const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permission.controller');
const auth = require('../middlewares/auth.middleware');

// Todas protegidas con JWT
router.get('/', auth, permissionController.list);
router.get('/:id', auth, permissionController.getOne);
router.post('/', auth, permissionController.create);
router.put('/:id', auth, permissionController.update);
router.delete('/:id', auth, permissionController.remove);

module.exports = router; // súper importante
