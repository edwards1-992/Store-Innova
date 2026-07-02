-- =============================================
-- BASE DE DATOS: tiendaOnline
-- ESTRUCTURA NORMALIZADA Y ESTANDARIZADA
-- =============================================

CREATE DATABASE tiendaOnline;

\c tiendaOnline;

-- =============================================
-- TABLA: roles
-- =============================================
CREATE TABLE roles (
    rol_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(150)
);

-- =============================================
-- TABLA: usuarios
-- =============================================
CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    rol_id INT NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_usuario_rol
        FOREIGN KEY (rol_id)
        REFERENCES roles(rol_id)
);

-- =============================================
-- TABLA: direcciones
-- =============================================
CREATE TABLE direcciones (
    direccion_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    pais VARCHAR(100) NOT NULL,
    departamento VARCHAR(100),
    ciudad VARCHAR(100),
    direccion TEXT NOT NULL,
    codigo_postal VARCHAR(20),
    referencia TEXT,
    principal BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_direccion_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
        ON DELETE CASCADE
);

-- =============================================
-- TABLA: categorias
-- =============================================
CREATE TABLE categorias (
    categoria_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    estado BOOLEAN DEFAULT TRUE
);

-- =============================================
-- TABLA: marcas
-- =============================================
CREATE TABLE marcas (
    marca_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

-- =============================================
-- TABLA: productos
-- =============================================
CREATE TABLE productos (
    producto_id SERIAL PRIMARY KEY,
    categoria_id INT NOT NULL,
    marca_id INT,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    sku VARCHAR(50) NOT NULL UNIQUE,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imagen_url TEXT,
    estado BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(categoria_id),

    CONSTRAINT fk_producto_marca
        FOREIGN KEY (marca_id)
        REFERENCES marcas(marca_id)
);

-- =============================================
-- TABLA: metodos_pago
-- =============================================
CREATE TABLE metodos_pago (
    metodo_pago_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

-- =============================================
-- TABLA: estados_venta
-- =============================================
CREATE TABLE estados_venta (
    estado_venta_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- =============================================
-- TABLA: ventas
-- =============================================
CREATE TABLE ventas (
    venta_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    direccion_id INT NOT NULL,
    metodo_pago_id INT NOT NULL,
    estado_venta_id INT NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2) NOT NULL,
    impuesto DECIMAL(10,2) DEFAULT 0,
    descuento DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_venta_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id),

    CONSTRAINT fk_venta_direccion
        FOREIGN KEY (direccion_id)
        REFERENCES direcciones(direccion_id),

    CONSTRAINT fk_venta_metodo_pago
        FOREIGN KEY (metodo_pago_id)
        REFERENCES metodos_pago(metodo_pago_id),

    CONSTRAINT fk_venta_estado
        FOREIGN KEY (estado_venta_id)
        REFERENCES estados_venta(estado_venta_id)
);

-- =============================================
-- TABLA: detalle_venta
-- =============================================
CREATE TABLE detalle_venta (
    detalle_venta_id SERIAL PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_detalle_venta
        FOREIGN KEY (venta_id)
        REFERENCES ventas(venta_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_detalle_producto
        FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
);

-- =============================================
-- TABLA: carrito
-- =============================================
CREATE TABLE carrito (
    carrito_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_carrito_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
        ON DELETE CASCADE
);

-- =============================================
-- TABLA: carrito_detalle
-- =============================================
CREATE TABLE carrito_detalle (
    carrito_detalle_id SERIAL PRIMARY KEY,
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,

    CONSTRAINT fk_carrito_detalle_carrito
        FOREIGN KEY (carrito_id)
        REFERENCES carrito(carrito_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_carrito_detalle_producto
        FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
);

-- =============================================
-- ÍNDICES
-- =============================================
CREATE INDEX idx_usuario_correo
ON usuarios(correo);

CREATE INDEX idx_producto_nombre
ON productos(nombre);

CREATE INDEX idx_venta_fecha
ON ventas(fecha_venta);

CREATE INDEX idx_detalle_venta_venta
ON detalle_venta(venta_id);

