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

module.exports = { getAllRoles };