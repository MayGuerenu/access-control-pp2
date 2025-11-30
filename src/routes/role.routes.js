const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, roleController.list); // ahora requiere token

module.exports = router;