@echo off
echo ====================================
echo  Configuracion de TiendaOnline
echo ====================================
echo.

where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] No se encuentra MySQL.
    pause
    exit /b 1
)

set /p MYSQL_PASS="Ingresa la contrasena de MySQL (deja vacio si no tiene): "

echo Creando base de datos y tablas...
if "%MYSQL_PASS%"=="" (
    mysql -u root < "%~dp0schema_mysql.sql"
) else (
    mysql -u root -p%MYSQL_PASS% < "%~dp0schema_mysql.sql"
)

if %ERRORLEVEL% EQU 0 (
    echo [OK] Base de datos creada
) else (
    echo [ERROR] Fallo al crear la base de datos
    pause
    exit /b 1
)

cd /d "%~dp0backend"
call npm install

echo.
echo Listo! Para iniciar: cd backend ^&^& node server.js
pause
