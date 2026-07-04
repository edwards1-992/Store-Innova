// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);

const nombre = params.get("nombre");
const precio = params.get("precio");
const img = params.get("img");

// Reemplazar en la página
document.getElementById("producto-nombre").textContent = nombre;
document.getElementById("producto-img").src = "img/" + img;

// Si quieres mostrar el precio
document.getElementById("producto-precio").textContent = "$" + parseFloat(precio).toLocaleString("en-US", {minimumFractionDigits:2});
