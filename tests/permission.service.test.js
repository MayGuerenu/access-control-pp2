const permissionService = require('../src/services/permission.service');

describe('Permission Service - validaciones', () => {
  test('no debería permitir crear permiso con nombre muy corto', async () => {
    await expect(permissionService.createPermission({ nombre: 'ab' }))
      .rejects
      .toThrow('Nombre del permiso inválido');
  });

  test('no debería permitir actualizar permiso con nombre vacío', async () => {
    await expect(permissionService.updatePermission(1, { nombre: '' }))
      .rejects
      .toThrow('Nombre del permiso inválido');
  });
});
