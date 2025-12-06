const form = document.getElementById('loginForm');
const messageEl = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  messageEl.classList.add('hidden');
  messageEl.textContent = '';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validación
  if (!email || !password) {
    messageEl.textContent = 'Email y contraseña son obligatorios';
    messageEl.classList.remove('hidden');
    messageEl.classList.add('text-red-500');
    return;
  }

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    // Guardar token en localStorage
    localStorage.setItem('token', data.token);

    // Mensaje de éxito
    messageEl.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
    messageEl.classList.remove('hidden');
    messageEl.classList.remove('text-red-500');
    messageEl.classList.add('text-emerald-600');

    // Redirigir al dashboard
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 1500);

  } catch (err) {
    messageEl.textContent = err.message;
    messageEl.classList.remove('hidden');
    messageEl.classList.remove('text-emerald-600');
    messageEl.classList.add('text-red-500');
  }
});
