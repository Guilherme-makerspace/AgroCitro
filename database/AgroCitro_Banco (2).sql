-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para agrocitro_bd
DROP DATABASE IF EXISTS `agrocitro_bd`;
CREATE DATABASE IF NOT EXISTS `agrocitro_bd` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `agrocitro_bd`;

-- Correção na tabela cadastro
DROP TABLE IF EXISTS `cadastro`;
CREATE TABLE IF NOT EXISTS `cadastro` (
  `id_cadastro` int(11) NOT NULL AUTO_INCREMENT,
  `id_login` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id_cadastro`),
  KEY `FK_cadastro_login` (`id_login`),
  CONSTRAINT `FK_cadastro_login` FOREIGN KEY (`id_login`) REFERENCES `login` (`id_login`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela agrocitro_bd.colheita
DROP TABLE IF EXISTS `colheita`;
CREATE TABLE IF NOT EXISTS `colheita` (
  `ID_Colheita` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Plantio` int(11) NOT NULL,
  `Data_Colheita` date NOT NULL,
  `Quantidade_Colhida` int(11) NOT NULL,
  `Qualidade` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_Colheita`),
  KEY `FK_colheita_plantio` (`ID_Plantio`),
  CONSTRAINT `FK_colheita_plantio` FOREIGN KEY (`ID_Plantio`) REFERENCES `plantio` (`ID_Plantio`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela agrocitro_bd.irrigação
DROP TABLE IF EXISTS `irrigação`;
CREATE TABLE IF NOT EXISTS `irrigação` (
  `ID_Irrigacao` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Plantio` int(11) NOT NULL,
  `Horario_Inicial` datetime NOT NULL,
  `Horario_Final` datetime NOT NULL,
  PRIMARY KEY (`ID_Irrigacao`),
  KEY `FK__plantio` (`ID_Plantio`),
  CONSTRAINT `FK__plantio` FOREIGN KEY (`ID_Plantio`) REFERENCES `plantio` (`ID_Plantio`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela agrocitro_bd.login
DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `id_login` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(100) NOT NULL DEFAULT '',
  `Senha` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela agrocitro_bd.plantio

DROP TABLE IF EXISTS `plantio`;
CREATE TABLE IF NOT EXISTS `plantio` (
  `ID_Plantio` int(11) NOT NULL AUTO_INCREMENT,
  `Variedade` varchar(50) NOT NULL,
  `Data_Plantio` date NOT NULL,
  `Quantidade_Plantada` int(11) NOT NULL,
  `Localizacao` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_Plantio`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

GRANT ALL PRIVILEGES ON agrocitro_bd.* TO 'agro_user'@'%';

FLUSH PRIVILEGES;



