const params = new URLSearchParams(window.location.search);
const nombre = params.get("nombre");
const precio = params.get("precio");
const img = params.get("img");
const descripcion = params.get("descripcion");

document.getElementById("producto-nombre").textContent = nombre;
document.getElementById("producto-img").src = "img/" + img;
document.getElementById("producto-precio").textContent = "Precio: $" + precio;
if (descripcion) {
    document.getElementById("producto-descripcion").textContent = decodeURIComponent(descripcion);
}
