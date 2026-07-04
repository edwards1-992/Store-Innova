const sql = require('mssql/msnodesqlv8');
const mysql = require('mysql2/promise');

const sqlConfig = {
    connectionString:
        'Driver={ODBC Driver 18 for SQL Server};' +
        'Server=localhost\\SQLEXPRESS;' +
        'Database=tiendaOnline;' +
        'Trusted_Connection=Yes;' +
        'TrustServerCertificate=Yes;'
};

const mysqlPool = mysql.createPool({
    host: process.env.MYSQLHOST || 'localhost',
    port: process.env.MYSQLPORT || 3306,
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    database: process.env.MYSQLDATABASE || 'tiendaOnline',
    waitForConnections: true,
    connectionLimit: 10,
});

async function migrar() {
    try {
        await sql.connect(sqlConfig);
        console.log('Conectado a SQL Server');

        const mysqlConn = await mysqlPool.getConnection();
        console.log('Conectado a MySQL');

        const tablas = [
            { nombre: 'productos', columnas: ['nombre', 'descripcion', 'precio', 'imagen', 'categoria', 'stock', 'estado', 'fecha_creacion'] },
            { nombre: 'usuarios', columnas: ['nombres', 'apellidos', 'cedula', 'celular', 'direccion', 'usuario', 'contrasena', 'estado', 'fecha_creacion'] },
            { nombre: 'usuarios_clientes', columnas: ['nombres', 'apellidos', 'cedula', 'celular', 'direccion', 'usuario', 'password_hash', 'fecha_registro'] },
            { nombre: 'ventas', columnas: ['usuario', 'total', 'fecha'] },
            { nombre: 'detalle_ventas', columnas: ['venta_id', 'producto', 'cantidad', 'precio', 'subtotal'] },
        ];

        for (const tabla of tablas) {
            console.log(`Migrando ${tabla.nombre}...`);

            const result = await sql.query(`SELECT * FROM ${tabla.nombre}`);
            const filas = result.recordset;
            console.log(`  ${filas.length} registros encontrados`);

            if (filas.length === 0) continue;

            const placeholders = tabla.columnas.map(() => '?').join(', ');
            const insertSQL = `INSERT INTO ${tabla.nombre} (${tabla.columnas.join(', ')}) VALUES (${placeholders})`;

            for (const fila of filas) {
                const valores = tabla.columnas.map(col => fila[col]);
                await mysqlConn.execute(insertSQL, valores);
            }

            console.log(`  ${filas.length} registros migrados`);
        }

        console.log('Migracion completada!');
        mysqlConn.release();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

migrar();
