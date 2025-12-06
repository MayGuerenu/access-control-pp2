const form = document.getElementById('registerForm');
const messageEl = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  messageEl.classList.add('hidden');
  messageEl.textContent = '';

  // Capturar valores del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const tipoPersona = document.getElementById('tipoPersona').value;
  const area = document.getElementById('area').value;
  const telefono = document.getElementById('telefono').value.trim();
  const disponibilidad = document.getElementById('disponibilidad').value.trim();

  // Validaciones rápidas antes de enviar
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    messageEl.textContent = 'Email inválido';
    messageEl.classList.remove('hidden');
    messageEl.classList.remove('text-emerald-600');
    messageEl.classList.add('text-red-500');
    return;
  }

  if (password.length < 6) {
    messageEl.textContent = 'La contraseña debe tener al menos 6 caracteres';
    messageEl.classList.remove('hidden');
    messageEl.classList.remove('text-emerald-600');
    messageEl.classList.add('text-red-500');
    return;
  }

  if (!nombre || !apellido) {
    messageEl.textContent = 'Nombre y apellido son obligatorios';
    messageEl.classList.remove('hidden');
    messageEl.classList.remove('text-emerald-600');
    messageEl.classList.add('text-red-500');
    return;
  }

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        apellido,
        email,
        password,
        tipoPersona,
        area,
        telefono,
        disponibilidad,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error al registrarse');
    }

    // Mensaje de éxito
    messageEl.textContent = 'Persona registrada con éxito. Ahora podés iniciar sesión.';
    messageEl.classList.remove('hidden');
    messageEl.classList.remove('text-red-500');
    messageEl.classList.add('text-emerald-600');

    // Actualizar perfil en pantalla (si existe dashboard con estos IDs)
    if (document.getElementById('perfil-nombre')) {
      document.getElementById('perfil-nombre').textContent = nombre;
      document.getElementById('perfil-apellido').textContent = apellido;
      document.getElementById('perfil-email').textContent = email;
      document.getElementById('perfil-telefono').textContent = telefono;
      document.getElementById('perfil-disponibilidad').textContent = disponibilidad;
      document.getElementById('perfil-area').textContent = area;
      document.getElementById('perfil-tipoPersona').textContent = tipoPersona;
    }

    // Resetear formulario y redirigir
    form.reset();
    setTimeout(() => {
      window.location.href = '/login.html';
    }, 1500);

  } catch (err) {
    // Mensaje de error
    messageEl.textContent = err.message;
    messageEl.classList.remove('hidden');
    messageEl.classList.remove('text-emerald-600');
    messageEl.classList.add('text-red-500');
  }
});
