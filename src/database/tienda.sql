-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 09-12-2021 a las 01:42:02
-- Versión del servidor: 5.7.21
-- Versión de PHP: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
CREATE TABLE IF NOT EXISTS `departamentos` (
  `iddepartamento` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iddepartamento`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`iddepartamento`, `nombre`) VALUES
(1, 'Frutas'),
(2, 'Refrescos'),
(3, 'Enlatados'),
(4, 'Dulces'),
(5, 'Frituras');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ventas`
--

DROP TABLE IF EXISTS `detalle_ventas`;
CREATE TABLE IF NOT EXISTS `detalle_ventas` (
  `iddetalle_ventas` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  `idventas` int(11) NOT NULL,
  `idproductos` int(11) NOT NULL,
  PRIMARY KEY (`iddetalle_ventas`),
  KEY `idventas` (`idventas`),
  KEY `idproductos` (`idproductos`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detalle_ventas`
--

INSERT INTO `detalle_ventas` (`iddetalle_ventas`, `cantidad`, `subtotal`, `idventas`, `idproductos`) VALUES
(35, 1, 16.5, 13, 4),
(34, 3, 49.5, 12, 33),
(33, 7, 115.5, 12, 7),
(32, 12, 198, 12, 34),
(31, 3, 49.5, 12, 28),
(30, 8, 132, 12, 12),
(29, 5, 82.5, 12, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `idproductos` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_compra` double DEFAULT NULL,
  `precio_venta` double DEFAULT NULL,
  `iddepartamento` int(11) NOT NULL,
  PRIMARY KEY (`idproductos`),
  KEY `iddepartamento` (`iddepartamento`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idproductos`, `nombre_producto`, `descripcion`, `cantidad`, `precio_compra`, `precio_venta`, `iddepartamento`) VALUES
(1, 'manzana', '', 389, 14.3, 16.5, 1),
(41, 'Pera', '', 322, 9.12, 14.99, 1),
(3, 'platano', '', 388, 14.3, 16.5, 1),
(4, 'fresa', '', 363, 14.3, 16.5, 1),
(5, 'mango', '', 353, 14.3, 16.5, 1),
(6, 'guayaba', '', 400, 14.3, 16.5, 1),
(7, 'sandia', '', 366, 14.3, 16.5, 1),
(8, 'melon', '', 387, 14.3, 16.5, 1),
(9, 'guanabana', '', 400, 14.3, 16.5, 1),
(10, 'aguacate', '', 400, 14.3, 16.5, 1),
(11, 'cocacola', '', 395, 14.3, 16.5, 2),
(12, 'fanta', '', 392, 14.3, 16.5, 2),
(13, 'sprite', '', 400, 14.3, 16.5, 2),
(14, 'mundet', '', 400, 14.3, 16.5, 2),
(15, 'manzanita', '', 393, 14.3, 16.5, 2),
(16, 'sidral', '', 394, 14.3, 16.5, 2),
(17, 'squirt', '', 400, 14.3, 16.5, 2),
(18, 'pepsi', '', 396, 14.3, 16.5, 2),
(19, 'seven', '', 400, 14.3, 16.5, 2),
(20, 'sangria', '', 400, 14.3, 16.5, 2),
(21, 'drpepper', '', 383, 14.3, 16.5, 2),
(22, 'tonicol', '', 389, 14.3, 16.5, 2),
(23, 'peñafiel', '', 400, 14.3, 16.5, 2),
(24, 'atun', '', 400, 14.3, 16.5, 3),
(25, 'sardina', '', 399, 14.3, 16.5, 3),
(26, 'verdura', '', 389, 14.3, 16.5, 3),
(27, 'elote', '', 400, 14.3, 16.5, 3),
(28, 'chiles', '', 397, 14.3, 16.5, 3),
(29, 'paleta', '', 400, 14.3, 16.5, 4),
(30, 'chicle', '', 396, 14.3, 16.5, 4),
(31, 'chocolate', '', 400, 14.3, 16.5, 4),
(32, 'sabritas', '', 400, 14.3, 16.5, 5),
(33, 'taquis', '', 388, 14.3, 16.5, 5),
(34, 'churumais', '', 388, 14.3, 16.5, 5),
(35, 'taquis fuego', '', 400, 14.3, 16.5, 5),
(36, 'taquis guacamole', '', 400, 14.3, 16.5, 5),
(37, 'doritos', '', 400, 14.3, 16.5, 5),
(38, 'doritos diablo', '', 400, 14.3, 16.5, 5),
(39, 'doritos incognita', '', 400, 14.3, 16.5, 5),
(40, 'doritos nachos', '', 400, 14.3, 16.5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('2CUaxMzE_ekCoDQwkrTVzafXtdhF2gTE', 1639100288, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"Missing credentials\",\"Missing credentials\",\"Missing credentials\"]},\"passport\":{}}'),
('8vCVEi8xMS7orGm-or1F-yrmQw4HCxpN', 1639031799, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('Mil7T_0MDlkTIDUGDCxUb4EeMNIWBlIf', 1639031799, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('PBqA-XzpWR7R_4e0lBnd2qMi-4OnkHOA', 1639031799, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('PHMEYMAMxGzjmGbvEquj3fFnVG4G2Wdc', 1639031799, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('TG_rhBJ0ARvWx_eF7AKm_qIi_ABT5F73', 1639031799, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('WG9SWAqecch-b71jk6z57ZYxbTi52Xj9', 1639077449, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('ajKEFPr4TeX_nCLIJPkeSNz6EuQueHYq', 1639031799, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('cQXAlqRx7SQtFojHR9GV6WHCvgXn6qW6', 1639031799, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('kvjq5m0nUqNlObxAHlG08Y5wMZv2PmU4', 1639031799, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('o0OGv2bwW-WKvAnbYsNRjU_NcQgkGr-l', 1639031799, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `apellido_paterno` varchar(40) NOT NULL,
  `apellido_materno` varchar(40) NOT NULL,
  `cargo` varchar(20) NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `contrasena` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido_paterno`, `apellido_materno`, `cargo`, `habilitado`, `correo`, `contrasena`) VALUES
(1, 'Manuel Yael', 'Soto', 'Baeza', 'vendedor', 1, 'sotobaeza.manuel@gmail.com', '123456789'),
(4, 'Jair', 'Suarez', 'Flores', 'vendedor', 0, 'jair.suarez3316@alumnos.udg.mx', '123456');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

DROP TABLE IF EXISTS `ventas`;
CREATE TABLE IF NOT EXISTS `ventas` (
  `idventas` int(11) NOT NULL AUTO_INCREMENT,
  `idusuarios` int(11) NOT NULL,
  `vendido` tinyint(4) DEFAULT NULL,
  `fecha_venta` date DEFAULT NULL,
  `total` double DEFAULT NULL,
  PRIMARY KEY (`idventas`),
  KEY `idusuarios` (`idusuarios`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`idventas`, `idusuarios`, `vendido`, `fecha_venta`, `total`) VALUES
(13, 0, 1, '2021-12-08', 16.5),
(12, 0, 1, '2021-12-08', 627);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
