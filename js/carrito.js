// =========================================
// CARRITO GLOBAL
// =========================================

let carrito = JSON.parse(
    localStorage.getItem("carrito")
) || [];


// =========================================
// ELEMENTOS
// =========================================

const contador = document.getElementById(
    "carrito-contador"
);

const listaCarrito = document.getElementById(
    "lista-carrito"
);

const totalElemento = document.getElementById(
    "total"
);

const mensajeVacio = document.getElementById(
    "mensaje-vacio"
);

const carritoIcono = document.getElementById(
    "carrito-icono"
);

const carritoPanel = document.getElementById(
    "carrito-panel"
);


// =========================================
// MOSTRAR / OCULTAR
// =========================================

if (carritoIcono) {

    carritoIcono.addEventListener(
        "click",
        () => {

            carritoPanel.classList.toggle(
                "oculto"
            );

        }
    );
}


// =========================================
// RENDER CARRITO
// =========================================

function renderCarrito() {

    if (!listaCarrito) return;

    listaCarrito.innerHTML = "";

    let total = 0;

    contador.innerText = carrito.length;

    if (carrito.length === 0) {

        mensajeVacio.style.display = "block";

    } else {

        mensajeVacio.style.display = "none";
    }

    carrito.forEach((producto, index) => {

        total += producto.precio *
                 producto.cantidad;

        const li = document.createElement("li");

        li.style.marginBottom = "15px";

       li.innerHTML = `

                    <div style="
                        display:flex;
                        flex-direction:column;
                        gap:6px;
                        padding:10px;
                        border-radius:10px;
                        background:#f5f5f5;
                        margin-bottom:10px;
                    ">

                        <span style="
                            font-weight:bold;
                            color:#333;
                            font-size:15px;
                        ">
                            ${producto.nombre}
                        </span>

                        <span style="
                            color:#555;
                        ">
                            Cantidad: ${producto.cantidad}
                        </span>

                        <span style="
                            color:#667eea;
                            font-weight:bold;
                        ">
                            Precio: $${producto.precio}
                        </span>

                        <span style="
                            color:#000;
                            font-weight:bold;
                        ">
                            Subtotal:
                            $${(
                                producto.precio *
                                producto.cantidad
                            ).toFixed(2)}
                        </span>

                        <button
                            onclick="eliminarProducto(${index})"
                            style="
                                border:none;
                                background:#ff4d4d;
                                color:white;
                                padding:8px;
                                border-radius:8px;
                                cursor:pointer;
                            "
                        >
                            Eliminar
                        </button>

                    </div>
                `;

        listaCarrito.appendChild(li);

    });

    totalElemento.innerText = total.toFixed(2);

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}


// =========================================
// ELIMINAR PRODUCTO
// =========================================

function eliminarProducto(index) {

    carrito.splice(index, 1);

    renderCarrito();
}


// =========================================
// AGREGAR AL CARRITO
// =========================================

const formCarrito = document.getElementById(
    "form-carrito"
);

if (formCarrito) {

    formCarrito.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();

            const nombre = document.getElementById(
                "producto-nombre"
            ).innerText;

            const precioTexto = document.getElementById(
                "producto-precio"
            ).innerText;

            const precio = parseFloat(
                precioTexto.replace(/[^0-9.]/g, "")
            );

            const cantidad = parseInt(
                document.getElementById(
                    "cantidad"
                ).value
            );

            const imagen = document.getElementById(
                "producto-img"
            ).src;

            carrito.push({

                nombre,
                precio,
                cantidad,
                imagen

            });

            renderCarrito();

            alert(
                "Producto agregado al carrito"
            );

        }
    );
}

function irCheckout() {

    const auth = localStorage.getItem('auth');
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // 1. validar login
    if (auth !== 'true' || !usuario) {
        alert("Debes iniciar sesión para continuar con la compra");
        window.location.href = "login.html";
        return;
    }

    // 2. validar carrito
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    // 3. guardar pedido
    localStorage.setItem('pedido_actual', JSON.stringify(carrito));

    // 4. ir checkout
    window.location.href = "checkout.html";
}


// =========================================
// INICIAR
// =========================================

renderCarrito();