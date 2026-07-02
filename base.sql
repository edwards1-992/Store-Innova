USE [master]
GO
/****** Object:  Database [tiendaOnline]    Script Date: 21/5/2026 14:23:52 ******/
CREATE DATABASE [tiendaOnline]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'tiendaOnline', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQL\DATA\tiendaOnline.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'tiendaOnline_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQL\DATA\tiendaOnline_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [tiendaOnline].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [tiendaOnline] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [tiendaOnline] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [tiendaOnline] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [tiendaOnline] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [tiendaOnline] SET ARITHABORT OFF 
GO
ALTER DATABASE [tiendaOnline] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [tiendaOnline] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [tiendaOnline] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [tiendaOnline] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [tiendaOnline] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [tiendaOnline] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [tiendaOnline] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [tiendaOnline] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [tiendaOnline] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [tiendaOnline] SET  ENABLE_BROKER 
GO
ALTER DATABASE [tiendaOnline] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [tiendaOnline] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [tiendaOnline] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [tiendaOnline] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [tiendaOnline] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [tiendaOnline] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [tiendaOnline] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [tiendaOnline] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [tiendaOnline] SET  MULTI_USER 
GO
ALTER DATABASE [tiendaOnline] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [tiendaOnline] SET DB_CHAINING OFF 
GO
ALTER DATABASE [tiendaOnline] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [tiendaOnline] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [tiendaOnline] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [tiendaOnline] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [tiendaOnline] SET QUERY_STORE = ON
GO
ALTER DATABASE [tiendaOnline] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [tiendaOnline]
GO
/****** Object:  Table [dbo].[detalle_ventas]    Script Date: 21/5/2026 14:23:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[detalle_ventas](
	[detalle_id] [int] IDENTITY(1,1) NOT NULL,
	[venta_id] [int] NOT NULL,
	[producto] [varchar](200) NOT NULL,
	[cantidad] [int] NOT NULL,
	[precio] [decimal](10, 2) NOT NULL,
	[subtotal] [decimal](10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[detalle_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[productos]    Script Date: 21/5/2026 14:23:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[productos](
	[producto_id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](200) NOT NULL,
	[descripcion] [varchar](500) NOT NULL,
	[precio] [decimal](10, 2) NOT NULL,
	[imagen] [varchar](250) NOT NULL,
	[categoria] [varchar](100) NOT NULL,
	[stock] [int] NULL,
	[estado] [bit] NULL,
	[fecha_creacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[producto_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 21/5/2026 14:23:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[usuario_id] [int] IDENTITY(1,1) NOT NULL,
	[nombres] [varchar](150) NOT NULL,
	[apellidos] [varchar](150) NOT NULL,
	[cedula] [varchar](50) NOT NULL,
	[celular] [varchar](20) NOT NULL,
	[direccion] [varchar](300) NOT NULL,
	[usuario] [varchar](100) NOT NULL,
	[contrasena] [varchar](255) NOT NULL,
	[estado] [bit] NULL,
	[fecha_creacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[usuario_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios_clientes]    Script Date: 21/5/2026 14:23:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios_clientes](
	[usuario_cliente_id] [int] IDENTITY(1,1) NOT NULL,
	[nombres] [varchar](100) NOT NULL,
	[apellidos] [varchar](100) NOT NULL,
	[cedula] [varchar](50) NOT NULL,
	[celular] [varchar](20) NOT NULL,
	[direccion] [varchar](255) NOT NULL,
	[usuario] [varchar](50) NOT NULL,
	[password_hash] [varchar](255) NOT NULL,
	[fecha_registro] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[usuario_cliente_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ventas]    Script Date: 21/5/2026 14:23:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ventas](
	[venta_id] [int] IDENTITY(1,1) NOT NULL,
	[usuario] [varchar](100) NOT NULL,
	[total] [decimal](10, 2) NOT NULL,
	[fecha] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[venta_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[productos] ADD  DEFAULT ((0)) FOR [stock]
GO
ALTER TABLE [dbo].[productos] ADD  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[productos] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[usuarios] ADD  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[usuarios] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[usuarios_clientes] ADD  DEFAULT (getdate()) FOR [fecha_registro]
GO
ALTER TABLE [dbo].[ventas] ADD  DEFAULT (getdate()) FOR [fecha]
GO
USE [master]
GO
ALTER DATABASE [tiendaOnline] SET  READ_WRITE 
GO
