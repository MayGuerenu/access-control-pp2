// public/js/dashboard.js
// ------- REFERENCIAS A ELEMENTOS DEL DOM -------

// Roles
const rolesList = document.getElementById('rolesList');
const errorEl = document.getElementById('error');
const userEmailEl = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');

const createRoleForm = document.getElementById('createRoleForm');
const newRoleNameInput = document.getElementById('newRoleName');
const createRoleMsg = document.getElementById('createRoleMsg');

const editRoleForm = document.getElementById('editRoleForm');
const editRoleIdInput = document.getElementById('editRoleId');
const editRoleNameInput = document.getElementById('editRoleName');
const editRoleMsg = document.getElementById('editRoleMsg');

// Permisos
const permissionsList = document.getElementById('permissionsList');
const createPermissionForm = document.getElementById('createPermissionForm');
const newPermissionNameInput = document.getElementById('newPermissionName');
const createPermissionMsg = document.getElementById('createPermissionMsg');

// ------- TOKEN Y EMAIL DEL USUARIO -------

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

// ------- ROLES: CARGAR, CREAR, EDITAR, ELIMINAR -------

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
      li.className = 'border rounded px-3 py-2 flex justify-between items-center';

      const left = document.createElement('div');
      left.innerHTML = `
        <span class="font-medium">${role.name}</span>
        <span class="text-xs text-slate-500 ml-2">ID: ${role.id}</span>
      `;

      const right = document.createElement('div');
      right.className = 'flex gap-2';

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.className = 'text-sm text-blue-600 underline';
      editBtn.addEventListener('click', () => {
        seleccionarRolParaEditar(role);
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.className = 'text-sm text-red-600 underline';
      deleteBtn.addEventListener('click', () => {
        eliminarRol(role.id, role.name);
      });

      right.appendChild(editBtn);
      right.appendChild(deleteBtn);

      li.appendChild(left);
      li.appendChild(right);

      rolesList.appendChild(li);
    });
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.classList.remove('hidden');
  }
}

// Crear rol
createRoleForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  createRoleMsg.classList.add('hidden');
  createRoleMsg.textContent = '';

  const name = newRoleNameInput.value.trim();
  if (!name) return;

  try {
    const res = await fetch('/api/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ name })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'No se pudo crear el rol');
    }

    createRoleMsg.textContent = 'Rol creado correctamente';
    createRoleMsg.classList.remove('hidden');
    createRoleMsg.classList.remove('text-red-500');
    createRoleMsg.classList.add('text-emerald-600');

    newRoleNameInput.value = '';
    cargarRoles();
  } catch (err) {
    createRoleMsg.textContent = err.message;
    createRoleMsg.classList.remove('hidden');
    createRoleMsg.classList.remove('text-emerald-600');
    createRoleMsg.classList.add('text-red-500');
  }
});

// Seleccionar rol para editar
function seleccionarRolParaEditar(role) {
  editRoleIdInput.value = role.id;
  editRoleNameInput.value = role.name;
  editRoleMsg.classList.add('hidden');
  editRoleMsg.textContent = '';
}

// Guardar cambios de rol
editRoleForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  editRoleMsg.classList.add('hidden');
  editRoleMsg.textContent = '';

  const id = editRoleIdInput.value;
  const name = editRoleNameInput.value.trim();

  if (!id) {
    editRoleMsg.textContent = 'Seleccioná un rol desde la lista para editar';
    editRoleMsg.classList.remove('hidden');
    editRoleMsg.classList.add('text-red-500');
    return;
  }

  try {
    const res = await fetch(`/api/roles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ name })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'No se pudo actualizar el rol');
    }

    editRoleMsg.textContent = 'Rol actualizado correctamente';
    editRoleMsg.classList.remove('hidden');
    editRoleMsg.classList.remove('text-red-500');
    editRoleMsg.classList.add('text-emerald-600');

    cargarRoles();
  } catch (err) {
    editRoleMsg.textContent = err.message;
    editRoleMsg.classList.remove('hidden');
    editRoleMsg.classList.remove('text-emerald-600');
    editRoleMsg.classList.add('text-red-500');
  }
});

// Eliminar rol
async function eliminarRol(id, name) {
  const confirmar = window.confirm(`¿Seguro que querés eliminar el rol "${name}"?`);
  if (!confirmar) return;

  try {
    const res = await fetch(`/api/roles/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    });

    if (!res.ok && res.status !== 204) {
      const data = await res.json();
      throw new Error(data.error || 'No se pudo eliminar el rol');
    }

    cargarRoles();
  } catch (err) {
    alert(err.message);
  }
}

// ------- PERMISOS: CARGAR, CREAR, ELIMINAR -------

async function cargarPermisos() {
  try {
    const res = await fetch('/api/permissions', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'No se pudieron cargar los permisos');
    }

    permissionsList.innerHTML = '';

    data.forEach((permiso) => {
      const li = document.createElement('li');
      li.className = 'border rounded px-3 py-2 flex justify-between items-center';

      const left = document.createElement('span');
      left.textContent = permiso.nombre;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.className = 'text-sm text-red-600 underline';
      deleteBtn.addEventListener('click', () => {
        eliminarPermiso(permiso.id, permiso.nombre);
      });

      li.appendChild(left);
      li.appendChild(deleteBtn);
      permissionsList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

// Crear permiso
createPermissionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  createPermissionMsg.classList.add('hidden');
  createPermissionMsg.textContent = '';

  const nombre = newPermissionNameInput.value.trim();
  if (!nombre) return;

  try {
    const res = await fetch('/api/permissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ nombre })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'No se pudo crear el permiso');
    }

    createPermissionMsg.textContent = 'Permiso creado correctamente';
    createPermissionMsg.classList.remove('hidden');
    createPermissionMsg.classList.remove('text-red-500');
    createPermissionMsg.classList.add('text-emerald-600');

    newPermissionNameInput.value = '';
    cargarPermisos();
  } catch (err) {
    createPermissionMsg.textContent = err.message;
    createPermissionMsg.classList.remove('hidden');
    createPermissionMsg.classList.remove('text-emerald-600');
    createPermissionMsg.classList.add('text-red-500');
  }
});

// Eliminar permiso
async function eliminarPermiso(id, nombre) {
  const confirmar = window.confirm(`¿Seguro que querés eliminar el permiso "${nombre}"?`);
  if (!confirmar) return;

  try {
    const res = await fetch(`/api/permissions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    });

    if (!res.ok && res.status !== 204) {
      const data = await res.json();
      throw new Error(data.error || 'No se pudo eliminar el permiso');
    }

    cargarPermisos();
  } catch (err) {
    alert(err.message);
  }
}

// ------- INICIO -------

cargarRoles();
cargarPermisos();
