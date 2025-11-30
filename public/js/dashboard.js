// public/js/dashboard.js
const rolesList = document.getElementById('rolesList');
const errorEl = document.getElementById('error');
const userEmailEl = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');

const token = localStorage.getItem('token');
const userEmail = localStorage.getItem('userEmail');

// Si no hay token -> volver al login
if (!token) {
  window.location.href = '/login.html';
}

// Mostrar email arriba
if (userEmail && userEmailEl) {
  userEmailEl.textContent = userEmail;
}

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  window.location.href = '/login.html';
});

// Cargar roles desde la API
async function cargarRoles() {
  try {
    const res = await fetch('/api/roles', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'No se pudieron cargar los roles');
    }

    rolesList.innerHTML = '';

    data.forEach((role) => {
      const li = document.createElement('li');
      li.className = 'border rounded px-3 py-2 flex justify-between';
      li.innerHTML = `
        <span>${role.name}</span>
        <span class="text-xs text-slate-500">ID: ${role.id}</span>
      `;
      rolesList.appendChild(li);
    });
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.classList.remove('hidden');
  }
}

cargarRoles();
