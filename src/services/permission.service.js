const supabase = require('../config/db');

async function getAllPermissions() {
  const { data, error } = await supabase
    .from('permissions')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error al obtener permisos:', error);
    throw new Error('No se pudieron obtener los permisos');
  }

  return data;
}

async function getPermissionById(id) {
  const { data, error } = await supabase
    .from('permissions')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error al obtener permiso:', error);
    throw new Error('Permiso no encontrado');
  }

  return data;
}

async function createPermission({ nombre }) {
  if (!nombre || nombre.length < 3) {
    throw new Error('Nombre del permiso inválido (mínimo 3 caracteres)');
  }

  const { data, error } = await supabase
    .from('permissions')
    .insert({ nombre })
    .select()
    .single();

  if (error) {
    console.error('Error al crear permiso:', error);
    throw new Error('No se pudo crear el permiso');
  }

  return data;
}

async function updatePermission(id, { nombre }) {
  if (!nombre || nombre.length < 3) {
    throw new Error('Nombre del permiso inválido (mínimo 3 caracteres)');
  }

  const { data, error } = await supabase
    .from('permissions')
    .update({ nombre })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    console.error('Error al actualizar permiso:', error);
    throw new Error('No se pudo actualizar el permiso');
  }

  return data;
}

async function deletePermission(id) {
  const { error } = await supabase
    .from('permissions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar permiso:', error);
    throw new Error('No se pudo eliminar el permiso');
  }

  return true;
}

module.exports = {
  getAllPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission
};