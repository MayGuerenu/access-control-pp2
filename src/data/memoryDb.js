// Roles fijos
const roles = [
  { id: 1, name: 'VOLUNTARIO', description: 'Voluntario de la ONG' },
  { id: 2, name: 'SOCIO', description: 'Socio de la ONG' },
  { id: 3, name: 'COORDINADOR', description: 'Coordina un área de trabajo' },
  { id: 4, name: 'ADMIN', description: 'Administrador del sistema' },
];

// Permisos 
const permissions = [
  { id: 1, code: 'GESTIONAR_VOLUNTARIOS', description: 'Crear y editar voluntarios' },
  { id: 2, code: 'GESTIONAR_SOCIOS', description: 'Administrar socios' },
  { id: 3, code: 'GESTIONAR_EVENTOS', description: 'Crear y gestionar eventos' },
  { id: 4, code: 'VER_REPORTES', description: 'Visualizar reportes' },
];

// Personas registradas (se van llenando en runtime)
const users = [];

module.exports = { roles, permissions, users };
