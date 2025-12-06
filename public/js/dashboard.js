// Menú
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  if (mobileMenu.classList.contains('max-h-0')) {
    mobileMenu.classList.remove('max-h-0');
    mobileMenu.classList.add('max-h-40'); // altura suficiente
  } else {
    mobileMenu.classList.remove('max-h-40');
    mobileMenu.classList.add('max-h-0');
  }
});

// Perfil y roles
const messageEl = document.getElementById('message');
const usuariosContainer = document.getElementById('usuarios-container');
const verUsuariosBtn = document.getElementById('ver-usuarios-btn');
const editarBtn = document.getElementById('editar-perfil-btn');
const editarForm = document.getElementById('editar-perfil-form');

async function cargarPerfil() {
  const token = localStorage.getItem('token');
  if (!token) {
    messageEl.textContent = 'No estás logueado. Redirigiendo al login...';
    messageEl.classList.remove('hidden');
    setTimeout(() => window.location.href = '/login.html', 1500);
    return;
  }

  try {
    const res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al cargar perfil');

    // Actualizar perfil
    document.getElementById('perfil-nombre').textContent = data.nombre;
    document.getElementById('perfil-apellido').textContent = data.apellido;
    document.getElementById('perfil-email').textContent = data.email;
    document.getElementById('perfil-telefono').textContent = data.telefono || '-';
    document.getElementById('perfil-disponibilidad').textContent = data.disponibilidad || '-';
    document.getElementById('perfil-area').textContent = data.area;
    document.getElementById('perfil-tipoPersona').textContent = data.tipo_persona;

    // Mostrar botón "Ver usuarios" solo si es ADMIN/COORDINADOR
    if (data.tipo_persona === 'ADMIN' || data.tipo_persona === 'COORDINADOR') {
      verUsuariosBtn.classList.remove('hidden');
    }
  } catch (err) {
    messageEl.textContent = err.message;
    messageEl.classList.remove('hidden');
  }
}

// Listar usuarios
async function listarUsuarios() {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('/api/auth/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al listar usuarios');

    // Renderizar tabla de usuarios
    usuariosContainer.innerHTML = `
     <div class="overflow-x-auto">
      <table class="min-w-full border mt-4 text-sm">
      <thead class="bg-purple-100 text-purple-800">
      <tr>
      <th class="p-2 border">Nombre</th>
      <th class="p-2 border">Apellido</th>
      <th class="p-2 border">Email</th>
      <th class="p-2 border">Tipo</th>
      <th class="p-2 border">Área</th>
      <th class="p-2 border">Teléfono</th>
      <th class="p-2 border">Disponibilidad</th>
      </tr>
     </thead>
  <tbody class="divide-y">
          ${data.map(u => `
            <tr>
              <td class="p-2 border">${u.nombre}</td>
              <td class="p-2 border">${u.apellido}</td>
              <td class="p-2 border">${u.email}</td>
              <td class="p-2 border">${u.tipo_persona}</td>
              <td class="p-2 border">${u.area}</td>
              <td class="p-2 border">${u.telefono || '-'}</td>
              <td class="p-2 border">${u.disponibilidad || '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      </div>
    `;
  } catch (err) {
    usuariosContainer.innerHTML = `<p class="text-red-500">${err.message}</p>`;
  }
}

// Eventos
document.addEventListener('DOMContentLoaded', cargarPerfil);
verUsuariosBtn.addEventListener('click', listarUsuarios);
