-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: LIC
-- Source Schemata: LIC
-- Created: Sun Sep 29 18:28:24 2024
-- Workbench Version: 8.0.38
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema LIC
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `LIC` ;
CREATE SCHEMA IF NOT EXISTS `LIC` ;

-- ----------------------------------------------------------------------------
-- Table LIC.Usuario
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `LIC`.`Usuario` (
  `id_Usario` INT NOT NULL AUTO_INCREMENT,
  `usuarioName` VARCHAR(50) NOT NULL,
  `contrasena` VARCHAR(500) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `Fecha_registro` DATE NOT NULL,
  `status` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_Usario`),
  UNIQUE (usuarioName),
  UNIQUE (email)
  );

-- ----------------------------------------------------------------------------
-- Table LIC.Tipo_servicio
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `LIC`.`Tipo_servicio` (
  `id_serv` INT NOT NULL  AUTO_INCREMENT,
  `Tipo` VARCHAR(50) NOT NULL,
  `Descripcion` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_serv`));

-- ----------------------------------------------------------------------------
-- Table LIC.Negocio
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `LIC`.`Negocio` (
  `id_negocio` INT NOT NULL  AUTO_INCREMENT,
  `nombreN` VARCHAR(100) NOT NULL,
  `horaAbrir` TIME NOT NULL,
  `horaCerrar` TIME NOT NULL,
  `id_serv` INT NOT NULL,
  `id_Usario` INT NOT NULL,
  `ubicacion` VARCHAR(200) NULL,
  `Descripcion` VARCHAR(200) NULL,
  `Imagen` VARCHAR(200) NULL,
  PRIMARY KEY (`id_negocio`),
  CONSTRAINT `FK__Negocio__id_serv__286302EC`
    FOREIGN KEY (`id_serv`)
    REFERENCES `LIC`.`Tipo_servicio` (`id_serv`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK__Negocio__id_Usar__29572725`
    FOREIGN KEY (`id_Usario`)
    REFERENCES `LIC`.`Usuario` (`id_Usario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    UNIQUE (nombreN));

-- ----------------------------------------------------------------------------
-- Table LIC.Categoria
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `LIC`.`Categoria` (
  `id_cat` INT NOT NULL  AUTO_INCREMENT,
  `categoria` VARCHAR(50) NOT NULL,
  `Descripcion` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id_cat`));

-- ----------------------------------------------------------------------------
-- Table LIC.Producto
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `LIC`.`Producto` (
  `id_producto` INT NOT NULL  AUTO_INCREMENT,
  `NombreProd` VARCHAR(150) NOT NULL,
  `id_cat` INT NOT NULL,
  `id_negocio` INT NOT NULL,
  `precio` DECIMAL(19,4) NOT NULL,
  `Descripcion` VARCHAR(200) NULL,
  `ImagenP` VARCHAR(200) NULL,
  PRIMARY KEY (`id_producto`),
  CONSTRAINT `FK__Producto__id_cat__2E1BDC42`
    FOREIGN KEY (`id_cat`)
    REFERENCES `LIC`.`Categoria` (`id_cat`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK__Producto__id_neg__2F10007B`
    FOREIGN KEY (`id_negocio`)
    REFERENCES `LIC`.`Negocio` (`id_negocio`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- ----------------------------------------------------------------------------
-- Table LIC.Reseña
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `LIC`.`Reseña` (
  `id_res` INT NOT NULL  AUTO_INCREMENT,
  `Resenador` VARCHAR(150) NULL,
  `Reseña` VARCHAR(250) NOT NULL,
  `Calificacion` INT NULL,
  `id_producto` INT NOT NULL,
  PRIMARY KEY (`id_res`),
  CONSTRAINT `FK__Reseña__id_produ__31EC6D26`
    FOREIGN KEY (`id_producto`)
    REFERENCES `LIC`.`Producto` (`id_producto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- ----------------------------------------------------------------------------
-- Table LIC.sysdiagrams
-- ----------------------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 1;
