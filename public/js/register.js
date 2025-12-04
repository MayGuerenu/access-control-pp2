const form = document.getElementById('registerForm');
const messageEl = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  messageEl.classList.add('hidden');
  messageEl.textContent = '';

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const tipoPersona = document.getElementById('tipoPersona').value;
  const area = document.getElementById('area').value;
  const telefono = document.getElementById('telefono').value;
  const disponibilidad = document.getElementById('disponibilidad').value;

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

    messageEl.textContent =
      'Persona registrada en la ONG con éxito. Ahora podés iniciar sesión.';
    messageEl.classList.remove('hidden');
    messageEl.classList.remove('text-red-500');
    messageEl.classList.add('text-emerald-600');

    form.reset();
    setTimeout(() => {
      window.location.href = '/login.html';
    }, 1500);
  } catch (err) {
    messageEl.textContent = err.message;
    messageEl.classList.remove('hidden');
    messageEl.classList.remove('text-emerald-600');
    messageEl.classList.add('text-red-500');
  }
});
