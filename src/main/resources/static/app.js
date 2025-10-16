const API = '/api/empleados';

const msg = document.getElementById('message');
const tabla = document.getElementById('tabla-empleados');

const form = document.getElementById('form-empleado');
const idEl = document.getElementById('id');
const nombreEl = document.getElementById('nombre');
const apellidoEl = document.getElementById('apellido');
const emailEl = document.getElementById('email');
const salarioEl = document.getElementById('salario');
const fechaEl = document.getElementById('fechaContratacion');
const deptoEl = document.getElementById('departamento');

function showMessage(text, ok = true) {
  msg.textContent = text;
  msg.className = `msg ${ok ? 'ok' : 'err'}`;
  msg.style.display = 'block';
  setTimeout(() => (msg.style.display = 'none'), 3500);
}

function formatDate(val) {
  if (!val) return '';
  const d = new Date(val);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

async function cargarEmpleados() {
  tabla.innerHTML = '<tr><td colspan="8">Cargando...</td></tr>';
  try {
    const res = await fetch(API);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Respuesta inesperada');
    if (data.length === 0) {
      tabla.innerHTML = '<tr><td colspan="8">Sin registros</td></tr>';
      return;
    }
    tabla.innerHTML = data
      .map(
        (e) => `
        <tr>
          <td>${e.id ?? ''}</td>
          <td>${e.nombre ?? ''}</td>
          <td>${e.apellido ?? ''}</td>
          <td>${e.email ?? ''}</td>
          <td>${e.salario ?? ''}</td>
          <td>${e.fechaContratacion ?? ''}</td>
          <td>${e.departamento ?? ''}</td>
          <td class="actions">
            <button onclick="editar(${e.id})">Editar</button>
            <button class="secondary" onclick="eliminar(${e.id})">Eliminar</button>
          </td>
        </tr>`
      )
      .join('');
  } catch (err) {
    console.error(err);
    showMessage('Error al cargar empleados', false);
  }
}

window.editar = async function (id) {
  try {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error('No encontrado');
    const e = await res.json();
    idEl.value = e.id;
    nombreEl.value = e.nombre ?? '';
    apellidoEl.value = e.apellido ?? '';
    emailEl.value = e.email ?? '';
    salarioEl.value = e.salario ?? '';
    fechaEl.value = formatDate(e.fechaContratacion);
    deptoEl.value = e.departamento ?? '';
    showMessage('Empleado cargado para edición');
  } catch (err) {
    showMessage('No se pudo cargar el empleado', false);
  }
};

window.eliminar = async function (id) {
  if (!confirm('¿Eliminar empleado?')) return;
  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar');
    await cargarEmpleados();
    showMessage('Empleado eliminado');
  } catch (err) {
    showMessage('No se pudo eliminar', false);
  }
};

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const payload = {
    nombre: nombreEl.value.trim(),
    apellido: apellidoEl.value.trim(),
    email: emailEl.value.trim() || null,
    salario: salarioEl.value ? Number(salarioEl.value) : null,
    fechaContratacion: fechaEl.value || null,
    departamento: deptoEl.value.trim() || null,
  };

  const id = idEl.value;
  try {
    const res = await fetch(id ? `${API}/${id}` : API, {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Error en la solicitud');
    }
    form.reset();
    idEl.value = '';
    await cargarEmpleados();
    showMessage(id ? 'Empleado actualizado' : 'Empleado creado');
  } catch (err) {
    showMessage('Error: ' + (err.message || 'operación fallida'), false);
  }
});

document.getElementById('btn-reset').addEventListener('click', () => {
  form.reset();
  idEl.value = '';
});

// Inicializar
document.addEventListener('DOMContentLoaded', cargarEmpleados);