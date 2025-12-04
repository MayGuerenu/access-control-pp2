const { Router } = require('express');
const {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} = require('../controllers/permission.controller');

const router = Router();

router.get('/', getPermissions);
router.post('/', createPermission);
router.put('/:id', updatePermission);
router.delete('/:id', deletePermission);

module.exports = router;
