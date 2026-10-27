// Referencias HTML
const btnCargar = document.getElementById('btn-cargar');
const btnError = document.getElementById('btn-error');
const mensaje = document.getElementById('mensaje');
const lista = document.getElementById('lista');

// Función principal con Fetch + Async/Await
const cargarProductos = async (ruta) => {
  lista.innerHTML = '';
  mensaje.textContent = '⏳ Cargando productos...';

  try {
    // 1. Pedimos los datos
    const respuesta = await fetch(ruta);

    if (!respuesta.ok) throw new Error('No se pudo encontrar el archivo.');

    // 2. Convertimos la respuesta a JSON
    const productos = await respuesta.json();

    // 3. Renderizamos en el DOM
    productos.forEach(prod => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h3>${prod.nombre}</h3>
        <p>Precio: $${prod.precio}</p>
        <small>Stock: ${prod.stock}</small>
      `;
      lista.appendChild(card);
    });

    mensaje.textContent = '';

    // 4. Notificación de éxito con Toastify
    Toastify({
      text: "✅ Productos cargados con éxito",
      duration: 3000,
      style: { background: "green" }
    }).showToast();

  } catch (error) {
    mensaje.textContent = '';

    // 5. Notificación de error con SweetAlert2
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'No se pudieron obtener los datos.'
    });

  } finally {
    console.log('Petición finalizada.');
  }
};

// Eventos
window.addEventListener('DOMContentLoaded', () => cargarProductos('./data.json'));
btnCargar.addEventListener('click', () => cargarProductos('./data.json'));
btnError.addEventListener('click', () => cargarProductos('./archivo-falso.json'));