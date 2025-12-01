const permissionService = require('../services/permission.service');

async function list(req, res) {
  try {
    const permisos = await permissionService.getAllPermissions();
    res.json(permisos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getOne(req, res) {
  try {
    const id = Number(req.params.id);
    const permiso = await permissionService.getPermissionById(id);
    res.json(permiso);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const permiso = await permissionService.createPermission(req.body);
    res.status(201).json(permiso);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const id = Number(req.params.id);
    const permiso = await permissionService.updatePermission(id, req.body);
    res.json(permiso);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const id = Number(req.params.id);
    await permissionService.deletePermission(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { list, getOne, create, update, remove };
