const form = document.getElementById('registerForm');
const messageEl = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  messageEl.classList.add('hidden');
  messageEl.textContent = '';

  const user = document.getElementById('user').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error al registrarse');
    }

    // Mensaje de éxito
    messageEl.textContent = 'Usuario creado con éxito. Ahora podés iniciar sesión.';
    messageEl.classList.remove('hidden');
    messageEl.classList.remove('text-red-500');
    messageEl.classList.add('text-emerald-600');

    // Limpiar form y redirigir al login después de 1.5s
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
