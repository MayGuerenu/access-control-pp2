const roleService = require('../services/role.service');

async function list(req, res) {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { list };
