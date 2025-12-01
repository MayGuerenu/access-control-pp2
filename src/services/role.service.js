const supabase = require('../config/db');

async function getAllRoles() {
  const { data, error } = await supabase
    .from('roles')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error al obtener roles:', error);
    throw new Error('No se pudieron obtener los roles');
  }

  return data;
}

async function getRoleById(id) {
  const { data, error } = await supabase
    .from('roles')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error al obtener rol:', error);
    throw new Error('Rol no encontrado');
  }

  return data;
}

async function createRole({ name }) {
  if (!name || name.length < 3) {
    throw new Error('Nombre del rol inválido (mínimo 3 caracteres)');
  }

  const { data, error } = await supabase
    .from('roles')
    .insert({ name })
    .select()
    .single();

  if (error) {
    console.error('Error al crear rol:', error);
    throw new Error('No se pudo crear el rol');
  }

  return data;
}

async function updateRole(id, { name }) {
  if (!name || name.length < 3) {
    throw new Error('Nombre del rol inválido (mínimo 3 caracteres)');
  }

  const { data, error } = await supabase
    .from('roles')
    .update({ name })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    console.error('Error al actualizar rol:', error);
    throw new Error('No se pudo actualizar el rol');
  }

  return data;
}

async function deleteRole(id) {
  const { error } = await supabase
    .from('roles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar rol:', error);
    throw new Error('No se pudo eliminar el rol');
  }

  return true;
}

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};