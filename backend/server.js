const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const pool = require('./conexion');

const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

app.post('/registro', async (req, res) => {
    try {
        let { nombres, apellidos, cedula, celular, direccion, usuario, password } = req.body;
        cedula = cedula.replace(/-/g, '').toUpperCase();
        celular = celular.replace(/-/g, '');
        const passwordHash = await bcrypt.hash(password, 10);

        await pool.execute(
            `INSERT INTO usuarios_clientes (nombres, apellidos, cedula, celular, direccion, usuario, password_hash)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nombres, apellidos, cedula, celular, direccion, usuario, passwordHash]
        );

        res.json({ ok: true, mensaje: 'Usuario registrado' });
    } catch (error) {
        console.log(error);
        res.json({ ok: false, mensaje: 'Error al registrar' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { usuario, password } = req.body;
        const [rows] = await pool.execute(
            'SELECT * FROM usuarios_clientes WHERE usuario = ?',
            [usuario]
        );

        if (rows.length === 0) {
            return res.json({ ok: false, mensaje: 'Usuario no encontrado' });
        }

        const user = rows[0];
        const validarPassword = await bcrypt.compare(password, user.password_hash);

        if (!validarPassword) {
            return res.json({ ok: false, mensaje: 'Contraseña incorrecta' });
        }

        res.json({
            ok: true,
            usuario: {
                usuario_cliente_id: user.usuario_cliente_id,
                nombres: user.nombres,
                apellidos: user.apellidos,
                cedula: user.cedula,
                celular: user.celular,
                direccion: user.direccion,
                usuario: user.usuario
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ ok: false, mensaje: 'Error en login' });
    }
});

app.get('/productos', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT producto_id, nombre, descripcion, precio, imagen, categoria FROM productos WHERE estado = 1'
        );
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error obteniendo productos' });
    }
});

app.post('/ventas', async (req, res) => {
    try {
        const { usuario, total, productos } = req.body;

        const [result] = await pool.execute(
            'INSERT INTO ventas (usuario, total, fecha) VALUES (?, ?, NOW())',
            [usuario, total]
        );
        const venta_id = result.insertId;

        for (const p of productos) {
            await pool.execute(
                'INSERT INTO detalle_ventas (venta_id, producto, cantidad, precio, subtotal) VALUES (?, ?, ?, ?, ?)',
                [venta_id, p.nombre, p.cantidad, p.precio, p.cantidad * p.precio]
            );
        }

        res.json({ ok: true, venta_id });
    } catch (error) {
        console.log(error);
        res.json({ ok: false, mensaje: 'Error creando venta' });
    }
});

app.get('/mis-ventas/:usuario', async (req, res) => {
    try {
        const { usuario } = req.params;
        const [rows] = await pool.execute(
            'SELECT venta_id, usuario, total, fecha FROM ventas WHERE usuario = ? ORDER BY fecha DESC',
            [usuario]
        );
        res.json({ ok: true, ventas: rows });
    } catch (error) {
        console.log(error);
        res.json({ ok: false, mensaje: 'Error obteniendo ventas' });
    }
});

app.get('/mis-ventas-detalle/:usuario', async (req, res) => {
    try {
        const { usuario } = req.params;
        const [ventas] = await pool.execute(
            'SELECT venta_id, total, fecha FROM ventas WHERE usuario = ? ORDER BY fecha DESC',
            [usuario]
        );

        for (let venta of ventas) {
            const [detalles] = await pool.execute(
                'SELECT producto, cantidad, precio, subtotal FROM detalle_ventas WHERE venta_id = ?',
                [venta.venta_id]
            );
            venta.detalles = detalles;
        }

        res.json({ ok: true, ventas });
    } catch (error) {
        console.log(error);
        res.json({ ok: false, mensaje: 'Error obteniendo pedidos' });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
