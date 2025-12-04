const { permissions } = require('../data/memoryDb');

let nextPermissionId = permissions.length
  ? Math.max(...permissions.map((p) => p.id)) + 1
  : 1;

// GET /api/permisos  o /api/permissions
const getPermissions = (req, res) => {
  const data = permissions.map((p) => ({
    ...p,
    _id: p.id, // compatibilidad por si el front usa _id
  }));
  res.json(data);
};

// POST /api/permisos
const createPermission = (req, res) => {
  const { code, description } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'El código del permiso es obligatorio' });
  }

  const exists = permissions.find(
    (p) => p.code.toLowerCase() === code.toLowerCase()
  );
  if (exists) {
    return res.status(400).json({ error: 'Ese permiso ya existe' });
  }

  const newPermission = {
    id: nextPermissionId++,
    code,
    description: description || '',
  };

  permissions.push(newPermission);

  res.status(201).json({
    ...newPermission,
    _id: newPermission.id,
  });
};

// PUT /api/permisos/:id
const updatePermission = (req, res) => {
  const { id } = req.params;
  const { code, description } = req.body;

  const permission = permissions.find((p) => p.id === Number(id));
  if (!permission) {
    return res.status(404).json({ error: 'Permiso no encontrado' });
  }

  if (code) permission.code = code;
  if (description !== undefined) permission.description = description;

  res.json({
    ...permission,
    _id: permission.id,
  });
};

// DELETE /api/permisos/:id
const deletePermission = (req, res) => {
  const { id } = req.params;
  const index = permissions.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Permiso no encontrado' });
  }

  const deleted = permissions.splice(index, 1)[0];
  res.json({
    message: 'Permiso eliminado correctamente',
    deleted: { ...deleted, _id: deleted.id },
  });
};

module.exports = {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
};
