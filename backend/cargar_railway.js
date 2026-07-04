const mysql = require('mysql2/promise');

async function main() {
    const conn = await mysql.createConnection({
        host: 'hayabusa.proxy.rlwy.net',
        port: 32903,
        user: 'root',
        password: 'SSiQPmZkPetqvrkceKKvfxoMKqUgVcRh',
        database: 'railway',
    });

    await conn.execute('DROP TABLE IF EXISTS detalle_ventas');
    await conn.execute('DROP TABLE IF EXISTS ventas');
    await conn.execute('DROP TABLE IF EXISTS usuarios_clientes');
    await conn.execute('DROP TABLE IF EXISTS productos');

    await conn.execute(`CREATE TABLE productos (
        producto_id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(200) NOT NULL,
        descripcion VARCHAR(500) NOT NULL,
        precio DECIMAL(10,2) NOT NULL,
        imagen VARCHAR(250) NOT NULL,
        categoria VARCHAR(100) NOT NULL,
        stock INT DEFAULT 0,
        estado TINYINT(1) DEFAULT 1,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    await conn.execute(`CREATE TABLE usuarios_clientes (
        usuario_cliente_id INT AUTO_INCREMENT PRIMARY KEY,
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        cedula VARCHAR(50) NOT NULL,
        celular VARCHAR(20) NOT NULL,
        direccion VARCHAR(255) NOT NULL,
        usuario VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    await conn.execute(`CREATE TABLE ventas (
        venta_id INT AUTO_INCREMENT PRIMARY KEY,
        usuario VARCHAR(100) NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    await conn.execute(`CREATE TABLE detalle_ventas (
        detalle_id INT AUTO_INCREMENT PRIMARY KEY,
        venta_id INT NOT NULL,
        producto VARCHAR(200) NOT NULL,
        cantidad INT NOT NULL,
        precio DECIMAL(10,2) NOT NULL,
        subtotal DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (venta_id) REFERENCES ventas(venta_id)
    )`);

    const productos = [
        ['AMD Ryzen 9 7950X3D', 'Procesador AMD Ryzen 9 7950X3D 16 nucleos 32 hilos 120W AM5', 749.99, 'AMD RYZEN 9 7950X3D.PNG', 'Procesadores', 10, 1],
        ['Intel Core i9-14900K', 'Procesador Intel Core i9-14900K 24 nucleos 32 hilos LGA1700', 589.99, 'INTEL CORE I9-14900K.PNG', 'Procesadores', 8, 1],
        ['Intel Core i7-14700K', 'Procesador Intel Core i7-14700K 20 nucleos 28 hilos LGA1700', 419.99, 'INTEL CORE I7-14700K.PNG', 'Procesadores', 12, 1],
        ['ASUS TUF GAMING B650-PLUS WIFI', 'Placa madre ASUS TUF Gaming B650-Plus WiFi AM5 DDR5', 189.99, 'ASUS TUF GAMING B650-PLUS WIFI.PNG', 'Placas Madre', 7, 1],
        ['GIGABYTE Z790 AORUS MASTER', 'Placa madre Gigabyte Z790 AORUS Master LGA1700 DDR5', 479.99, 'GIGABYTE Z790 AORUS MASTER.PNG', 'Placas Madre', 5, 1],
        ['MSI MAG B760 TOMAHAWK WIFI', 'Placa madre MSI MAG B760 Tomahawk WiFi LGA1700 DDR5', 229.99, 'MSI MAG B760 TOMAHAWK WIFI.PNG', 'Placas Madre', 6, 1],
        ['Corsair Dominator Titanium RGB', 'Memoria RAM Corsair Dominator Titanium RGB DDR5 32GB (2x16GB) 6400MHz', 249.99, 'CORSAIE DOMINAOR TITANIUM RGB.PNG', 'Memorias RAM', 15, 1],
        ['G.SKILL Trident Z5 RGB', 'Memoria RAM G.Skill Trident Z5 RGB DDR5 32GB (2x16GB) 6000MHz', 199.99, 'G.SKILL TRIDENT Z5 RGB.PNG', 'Memorias RAM', 12, 1],
        ['Kingston Fury Renegade DDR5', 'Memoria RAM Kingston Fury Renegade DDR5 32GB (2x16GB) 6400MHz', 219.99, 'KINGSTON FURY RENEGADE DDR5.PNG', 'Memorias RAM', 10, 1],
        ['ASUS ROG THOR 1000W Platinum II', 'Fuente de poder ASUS ROG THOR 1000W Platinum II modular', 299.99, 'ASUS ROG THOR 1000W PLATINUM 11.PNG', 'Fuentes de Poder', 8, 1],
        ['Corsair RM1000x SHIFT', 'Fuente de poder Corsair RM1000x SHIFT 1000W 80+ Gold modular', 189.99, 'CORSAIR RM1000X SHIFT.PNG', 'Fuentes de Poder', 9, 1],
        ['Thermaltake Toughpower GF3 1000W', 'Fuente de poder Thermaltake Toughpower GF3 1000W 80+ Gold ATX 3.0', 169.99, 'THERMALTAKE TOUGHPOWER GF3 1000W.PNG', 'Fuentes de Poder', 11, 1],
        ['ADATA SU650', 'Disco SSD ADATA SU650 480GB SATA III 2.5"', 49.99, 'ADATA SU650.PNG', 'Almacenamiento', 20, 1],
        ['Kingston KC600', 'Disco SSD Kingston KC600 512GB SATA III 2.5"', 64.99, 'KINGSTON KC600.PNG', 'Almacenamiento', 18, 1],
        ['PNY CS900', 'Disco SSD PNY CS900 480GB SATA III 2.5"', 44.99, 'PNY CS900.PNG', 'Almacenamiento', 22, 1],
        ['WD Blue 3D NAND', 'Disco SSD WD Blue 3D NAND 500GB SATA III 2.5"', 59.99, 'WD BLUE 3D NAND.PNG', 'Almacenamiento', 16, 1],
    ];

    for (const p of productos) {
        await conn.execute('INSERT INTO productos (nombre, descripcion, precio, imagen, categoria, stock, estado) VALUES (?, ?, ?, ?, ?, ?, ?)', p);
    }

    const [rows] = await conn.execute('SELECT COUNT(*) as total FROM productos');
    console.log('OK -', rows[0].total, 'productos cargados en Railway');

    await conn.end();
}

main().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
