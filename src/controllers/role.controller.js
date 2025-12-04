const { roles } = require('../data/memoryDb');

let nextRoleId = roles.length ? Math.max(...roles.map(r => r.id)) + 1 : 1;

// GET /api/roles
const getRoles = (req, res) => {
  // Devolvemos también un _id para compatibilidad con el front
  const data = roles.map((r) => ({
    ...r,
    _id: r.id, // por si el front usa _id
  }));
  res.json(data);
};

// POST /api/roles
const createRole = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'El nombre del rol es obligatorio' });
  }

  const exists = roles.find(
    (r) => r.name.toLowerCase() === name.toLowerCase()
  );
  if (exists) {
    return res.status(400).json({ error: 'Ese rol ya existe' });
  }

  const newRole = {
    id: nextRoleId++,
    name,
    description: '',
  };

  roles.push(newRole);

  res.status(201).json({
    ...newRole,
    _id: newRole.id,
  });
};

// PUT /api/roles/:id
const updateRole = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const role = roles.find((r) => r.id === Number(id));
  if (!role) {
    return res.status(404).json({ error: 'Rol no encontrado' });
  }

  if (name) role.name = name;
  if (description !== undefined) role.description = description;

  res.json({
    ...role,
    _id: role.id,
  });
};

// DELETE /api/roles/:id
const deleteRole = (req, res) => {
  const { id } = req.params;
  const index = roles.findIndex((r) => r.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Rol no encontrado' });
  }

  const deleted = roles.splice(index, 1)[0];
  res.json({
    message: 'Rol eliminado correctamente',
    deleted: { ...deleted, _id: deleted.id },
  });
};

module.exports = { getRoles, createRole, updateRole, deleteRole };
