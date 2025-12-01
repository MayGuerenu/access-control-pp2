const authService = require('../src/services/auth.service');

describe('Auth Service - validaciones de registro y login', () => {
  test('no debería registrar usuario sin nombre', async () => {
    await expect(
      authService.registerUser({ user: '', email: 'test@test.com', password: '123456' })
    ).rejects.toThrow('Nombre inválido');
  });

  test('no debería registrar usuario con email inválido', async () => {
    await expect(
      authService.registerUser({ user: 'Mayra', email: 'malemail', password: '123456' })
    ).rejects.toThrow('Email inválido');
  });

  test('no debería registrar usuario con contraseña muy corta', async () => {
    await expect(
      authService.registerUser({ user: 'Mayra', email: 'test@test.com', password: '123' })
    ).rejects.toThrow('La contraseña debe tener al menos 6 caracteres');
  });
});
