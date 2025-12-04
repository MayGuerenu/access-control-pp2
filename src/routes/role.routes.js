const { Router } = require('express');
const {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} = require('../controllers/role.controller');

const router = Router();

router.get('/', getRoles);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

module.exports = router;