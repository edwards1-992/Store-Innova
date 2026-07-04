const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    uri: process.env.MYSQL_URL || undefined,
    host: process.env.MYSQL_URL ? undefined : (process.env.MYSQLHOST || 'localhost'),
    port: process.env.MYSQL_URL ? undefined : (process.env.MYSQLPORT || 3306),
    user: process.env.MYSQL_URL ? undefined : (process.env.MYSQLUSER || 'root'),
    password: process.env.MYSQL_URL ? undefined : (process.env.MYSQLPASSWORD || 'SSiQPmZkPetqvrkceKKvfxoMKqUgVcRh'),
    database: process.env.MYSQL_URL ? undefined : (process.env.MYSQLDATABASE || 'tiendaOnline'),
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 10000,
});

module.exports = pool;
