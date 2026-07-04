async function registrarUsuario() {

    const nombres = document.getElementById('nombres').value;

    const apellidos = document.getElementById('apellidos').value;

    const cedula = document.getElementById('cedula').value;

    const celular = document.getElementById('celular').value;

    const direccion = document.getElementById('direccion').value;

    const usuario = document.getElementById('usuario').value;

    const password = document.getElementById('password').value;

    try {

        const response = await fetch('http://localhost:3000/registro', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                nombres,
                apellidos,
                cedula,
                celular,
                direccion,
                usuario,
                password
            })
        });

        const data = await response.json();

        if (data.ok) {

            alert('Usuario registrado correctamente');

            window.location.href = 'login.html';

        } else {

            alert(data.mensaje);
        }

    } catch (error) {

        console.log(error);

        alert('Error de conexión');
    }
}