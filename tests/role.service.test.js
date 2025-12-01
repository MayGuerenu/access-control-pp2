const roleService = require('../src/services/role.service');

describe('Role Service - validaciones', () => {
  test('no debería permitir crear rol con nombre muy corto', async () => {
    await expect(roleService.createRole({ name: 'ab' }))
      .rejects
      .toThrow('Nombre del rol inválido');
  });

  test('no debería permitir actualizar rol con nombre vacío', async () => {
    await expect(roleService.updateRole(1, { name: '' }))
      .rejects
      .toThrow('Nombre del rol inválido');
  });
});
