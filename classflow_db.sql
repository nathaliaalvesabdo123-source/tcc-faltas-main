-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10/09/2026 às 21:43
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `classflow_db`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `aulas`
--

CREATE TABLE `aulas` (
  `id` int(11) NOT NULL,
  `turma_id` int(11) NOT NULL,
  `disciplina` varchar(100) NOT NULL,
  `dia_semana` varchar(20) NOT NULL,
  `bloco` int(11) NOT NULL,
  `horario_inicio` time NOT NULL,
  `horario_fim` time NOT NULL,
  `professor` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `aulas`
--

INSERT INTO `aulas` (`id`, `turma_id`, `disciplina`, `dia_semana`, `bloco`, `horario_inicio`, `horario_fim`, `professor`) VALUES
(1, 1, 'Inglês', 'Segunda', 1, '07:00:00', '07:50:00', NULL),
(2, 1, 'Inglês', 'Segunda', 2, '07:50:00', '08:40:00', NULL),
(3, 1, 'História', 'Segunda', 3, '08:40:00', '09:30:00', 'Luiz'),
(4, 1, 'História', 'Segunda', 4, '09:50:00', '10:40:00', 'Luiz'),
(5, 1, 'Arte', 'Segunda', 5, '10:40:00', '11:30:00', NULL),
(6, 1, 'Arte', 'Segunda', 6, '11:30:00', '12:20:00', NULL),
(7, 1, 'Educação Física', 'Terça', 1, '07:00:00', '07:50:00', NULL),
(8, 1, 'Educação Física', 'Terça', 2, '07:50:00', '08:40:00', NULL),
(9, 1, 'Matemática', 'Terça', 3, '08:40:00', '09:30:00', 'Mara'),
(10, 1, 'Matemática', 'Terça', 4, '09:50:00', '10:40:00', 'Mara'),
(11, 1, 'Química', 'Terça', 5, '10:40:00', '11:30:00', 'Denis'),
(12, 1, 'Química', 'Terça', 6, '11:30:00', '12:20:00', 'Denis'),
(13, 1, 'Geografia', 'Quarta', 1, '07:00:00', '07:50:00', 'Barbosa'),
(14, 1, 'Geografia', 'Quarta', 2, '07:50:00', '08:40:00', 'Barbosa'),
(15, 1, 'Física', 'Quarta', 3, '08:40:00', '09:30:00', 'Diogo'),
(16, 1, 'Física', 'Quarta', 4, '09:50:00', '10:40:00', 'Diogo'),
(17, 1, 'Filosofia', 'Quarta', 5, '10:40:00', '11:30:00', 'Luiz'),
(18, 1, 'Filosofia', 'Quarta', 6, '11:30:00', '12:20:00', 'Luiz'),
(19, 1, 'Empreendedorismo', 'Quinta', 1, '07:00:00', '07:50:00', 'Denis'),
(20, 1, 'Empreendedorismo', 'Quinta', 2, '07:50:00', '08:40:00', 'Denis'),
(21, 1, 'Biologia', 'Quinta', 3, '08:40:00', '09:30:00', 'Rodrigo'),
(22, 1, 'Biologia', 'Quinta', 4, '09:50:00', '10:40:00', 'Rodrigo'),
(23, 1, 'Língua Portuguesa', 'Quinta', 5, '10:40:00', '11:30:00', 'Polyana'),
(24, 1, 'Língua Portuguesa', 'Quinta', 6, '11:30:00', '12:20:00', 'Polyana'),
(25, 1, 'Matemática', 'Sexta', 1, '07:00:00', '07:50:00', 'Mara'),
(26, 1, 'Matemática', 'Sexta', 2, '07:50:00', '08:40:00', 'Mara'),
(27, 1, 'Língua Portuguesa', 'Sexta', 3, '08:40:00', '09:30:00', 'Polyana'),
(28, 1, 'TPT', 'Sexta', 4, '09:50:00', '10:40:00', 'Marilise'),
(29, 1, 'Sociologia', 'Sexta', 5, '10:40:00', '11:30:00', 'Barbosa'),
(30, 1, 'Sociologia', 'Sexta', 6, '11:30:00', '12:20:00', 'Barbosa'),
(31, 2, 'Geografia', 'Segunda', 1, '07:00:00', '07:50:00', 'Barbosa'),
(32, 2, 'Geografia', 'Segunda', 2, '07:50:00', '08:40:00', 'Barbosa'),
(33, 2, 'Arte', 'Segunda', 3, '08:40:00', '09:30:00', NULL),
(34, 2, 'Arte', 'Segunda', 4, '09:50:00', '10:40:00', NULL),
(35, 2, 'História', 'Segunda', 5, '10:40:00', '11:30:00', 'Luiz'),
(36, 2, 'História', 'Segunda', 6, '11:30:00', '12:20:00', 'Luiz'),
(37, 2, 'Língua Portuguesa', 'Terça', 1, '07:00:00', '07:50:00', 'Polyana'),
(38, 2, 'Língua Portuguesa', 'Terça', 2, '07:50:00', '08:40:00', 'Polyana'),
(39, 2, 'Inglês', 'Terça', 3, '08:40:00', '09:30:00', NULL),
(40, 2, 'Inglês', 'Terça', 4, '09:50:00', '10:40:00', NULL),
(41, 2, 'Educação Física', 'Terça', 5, '10:40:00', '11:30:00', NULL),
(42, 2, 'Educação Física', 'Terça', 6, '11:30:00', '12:20:00', NULL),
(43, 2, 'Física', 'Quarta', 1, '07:00:00', '07:50:00', 'Diogo'),
(44, 2, 'Física', 'Quarta', 2, '07:50:00', '08:40:00', 'Diogo'),
(45, 2, 'Química', 'Quarta', 3, '08:40:00', '09:30:00', 'Denis'),
(46, 2, 'Química', 'Quarta', 4, '09:50:00', '10:40:00', 'Denis'),
(47, 2, 'Biologia', 'Quarta', 5, '10:40:00', '11:30:00', 'Rodrigo'),
(48, 2, 'Biologia', 'Quarta', 6, '11:30:00', '12:20:00', 'Rodrigo'),
(49, 2, 'Matemática', 'Quinta', 1, '07:00:00', '07:50:00', 'Kelvius'),
(50, 2, 'Matemática', 'Quinta', 2, '07:50:00', '08:40:00', 'Kelvius'),
(51, 2, 'Empreendedorismo', 'Quinta', 3, '08:40:00', '09:30:00', 'Denis'),
(52, 2, 'Empreendedorismo', 'Quinta', 4, '09:50:00', '10:40:00', 'Denis'),
(53, 2, 'Filosofia', 'Quinta', 5, '10:40:00', '11:30:00', 'Luiz'),
(54, 2, 'Filosofia', 'Quinta', 6, '11:30:00', '12:20:00', 'Luiz'),
(55, 2, 'Sociologia', 'Sexta', 1, '07:00:00', '07:50:00', 'Barbosa'),
(56, 2, 'Sociologia', 'Sexta', 2, '07:50:00', '08:40:00', 'Barbosa'),
(57, 2, 'TPT', 'Sexta', 3, '08:40:00', '09:30:00', 'Marilise'),
(58, 2, 'Língua Portuguesa', 'Sexta', 4, '09:50:00', '10:40:00', 'Polyana'),
(59, 2, 'Matemática', 'Sexta', 5, '10:40:00', '11:30:00', 'Kelvius'),
(60, 2, 'Matemática', 'Sexta', 6, '11:30:00', '12:20:00', 'Kelvius'),
(61, 3, 'História', 'Terça', 1, '07:00:00', '07:50:00', 'Luiz'),
(62, 3, 'História', 'Terça', 2, '07:50:00', '08:40:00', 'Luiz'),
(63, 3, 'Física', 'Terça', 3, '08:40:00', '09:30:00', 'Diogo'),
(64, 3, 'Química', 'Terça', 4, '09:50:00', '10:40:00', 'Denis'),
(65, 3, 'Geografia', 'Terça', 5, '10:40:00', '11:30:00', 'Barbosa'),
(66, 3, 'Geografia', 'Terça', 6, '11:30:00', '12:20:00', 'Barbosa'),
(67, 3, 'Língua Portuguesa', 'Quarta', 1, '07:00:00', '07:50:00', 'Marilise'),
(68, 3, 'Língua Portuguesa', 'Quarta', 2, '07:50:00', '08:40:00', 'Marilise'),
(69, 3, 'Matemática', 'Quarta', 3, '08:40:00', '09:30:00', 'Mara'),
(70, 3, 'Matemática', 'Quarta', 4, '09:50:00', '10:40:00', 'Mara'),
(71, 3, 'Arte', 'Quarta', 5, '10:40:00', '11:30:00', NULL),
(72, 3, 'Inglês', 'Quarta', 6, '11:30:00', '12:20:00', NULL),
(73, 3, 'Língua Portuguesa', 'Sexta', 1, '07:00:00', '07:50:00', 'Marilise'),
(74, 3, 'Biologia', 'Sexta', 2, '07:50:00', '08:40:00', 'Rodrigo'),
(75, 3, 'Sociologia', 'Sexta', 3, '08:40:00', '09:30:00', 'Barbosa'),
(76, 3, 'Matemática', 'Sexta', 4, '09:50:00', '10:40:00', 'Mara'),
(77, 3, 'Educação Física', 'Sexta', 5, '10:40:00', '11:30:00', NULL),
(78, 3, 'Filosofia', 'Sexta', 6, '11:30:00', '12:20:00', 'Luiz'),
(79, 7, 'SENAI', 'Segunda', 1, '07:00:00', '07:45:00', NULL),
(80, 7, 'SENAI', 'Segunda', 2, '07:45:00', '08:30:00', NULL),
(81, 7, 'SENAI', 'Segunda', 3, '08:30:00', '09:15:00', NULL),
(82, 7, 'SENAI', 'Segunda', 4, '09:35:00', '10:20:00', NULL),
(83, 7, 'SENAI', 'Segunda', 5, '10:20:00', '11:05:00', NULL),
(84, 7, 'SENAI', 'Segunda', 6, '11:05:00', '11:50:00', NULL),
(85, 7, 'SENAI', 'Segunda', 7, '13:20:00', '14:05:00', NULL),
(86, 7, 'SENAI', 'Segunda', 8, '14:05:00', '14:50:00', NULL),
(87, 7, 'SENAI', 'Segunda', 9, '14:50:00', '15:35:00', NULL),
(88, 7, 'SENAI', 'Segunda', 10, '15:35:00', '16:20:00', NULL),
(89, 7, 'SENAI', 'Quinta', 1, '07:00:00', '07:45:00', NULL),
(90, 7, 'SENAI', 'Quinta', 2, '07:45:00', '08:30:00', NULL),
(91, 7, 'SENAI', 'Quinta', 3, '08:30:00', '09:15:00', NULL),
(92, 7, 'SENAI', 'Quinta', 4, '09:35:00', '10:20:00', NULL),
(93, 7, 'SENAI', 'Quinta', 5, '10:20:00', '11:05:00', NULL),
(94, 7, 'SENAI', 'Quinta', 6, '11:05:00', '11:50:00', NULL),
(95, 7, 'SENAI', 'Quinta', 7, '13:20:00', '14:05:00', NULL),
(96, 7, 'SENAI', 'Quinta', 8, '14:05:00', '14:50:00', NULL),
(97, 7, 'SENAI', 'Quinta', 9, '14:50:00', '15:35:00', NULL),
(98, 7, 'SENAI', 'Quinta', 10, '15:35:00', '16:20:00', NULL),
(99, 4, 'História', 'Segunda', 1, '07:00:00', '07:50:00', 'Luiz'),
(100, 4, 'História', 'Segunda', 2, '07:50:00', '08:40:00', 'Luiz'),
(101, 4, 'Química', 'Segunda', 3, '08:40:00', '09:30:00', 'Denis'),
(102, 4, 'Matemática', 'Segunda', 4, '09:50:00', '10:40:00', 'Mara'),
(103, 4, 'Matemática', 'Segunda', 5, '10:40:00', '11:30:00', 'Mara'),
(104, 4, 'Física', 'Segunda', 6, '11:30:00', '12:20:00', 'Diogo'),
(105, 4, 'Geografia', 'Quinta', 1, '07:00:00', '07:50:00', 'Barbosa'),
(106, 4, 'Geografia', 'Quinta', 2, '07:50:00', '08:40:00', 'Barbosa'),
(107, 4, 'Língua Portuguesa', 'Quinta', 3, '08:40:00', '09:30:00', 'Marilise'),
(108, 4, 'Língua Portuguesa', 'Quinta', 4, '09:50:00', '10:40:00', 'Marilise'),
(109, 4, 'Arte', 'Quinta', 5, '10:40:00', '11:30:00', NULL),
(110, 4, 'Inglês', 'Quinta', 6, '11:30:00', '12:20:00', NULL),
(111, 4, 'Biologia', 'Sexta', 1, '07:00:00', '07:50:00', 'Rodrigo'),
(112, 4, 'Língua Portuguesa', 'Sexta', 2, '07:50:00', '08:40:00', 'Marilise'),
(113, 4, 'Matemática', 'Sexta', 3, '08:40:00', '09:30:00', 'Mara'),
(114, 4, 'Sociologia', 'Sexta', 4, '09:50:00', '10:40:00', 'Barbosa'),
(115, 4, 'Filosofia', 'Sexta', 5, '10:40:00', '11:30:00', 'Luiz'),
(116, 4, 'Educação Física', 'Sexta', 6, '11:30:00', '12:20:00', NULL),
(117, 8, 'SENAI', 'Terça', 1, '07:00:00', '07:45:00', NULL),
(118, 8, 'SENAI', 'Terça', 2, '07:45:00', '08:30:00', NULL),
(119, 8, 'SENAI', 'Terça', 3, '08:30:00', '09:15:00', NULL),
(120, 8, 'SENAI', 'Terça', 4, '09:35:00', '10:20:00', NULL),
(121, 8, 'SENAI', 'Terça', 5, '10:20:00', '11:05:00', NULL),
(122, 8, 'SENAI', 'Terça', 6, '11:05:00', '11:50:00', NULL),
(123, 8, 'SENAI', 'Terça', 7, '13:20:00', '14:05:00', NULL),
(124, 8, 'SENAI', 'Terça', 8, '14:05:00', '14:50:00', NULL),
(125, 8, 'SENAI', 'Terça', 9, '14:50:00', '15:35:00', NULL),
(126, 8, 'SENAI', 'Terça', 10, '15:35:00', '16:20:00', NULL),
(127, 8, 'SENAI', 'Quarta', 1, '07:00:00', '07:45:00', NULL),
(128, 8, 'SENAI', 'Quarta', 2, '07:45:00', '08:30:00', NULL),
(129, 8, 'SENAI', 'Quarta', 3, '08:30:00', '09:15:00', NULL),
(130, 8, 'SENAI', 'Quarta', 4, '09:35:00', '10:20:00', NULL),
(131, 8, 'SENAI', 'Quarta', 5, '10:20:00', '11:05:00', NULL),
(132, 8, 'SENAI', 'Quarta', 6, '11:05:00', '11:50:00', NULL),
(133, 8, 'SENAI', 'Quarta', 7, '13:20:00', '14:05:00', NULL),
(134, 8, 'SENAI', 'Quarta', 8, '14:05:00', '14:50:00', NULL),
(135, 8, 'SENAI', 'Quarta', 9, '14:50:00', '15:35:00', NULL),
(136, 8, 'SENAI', 'Quarta', 10, '15:35:00', '16:20:00', NULL),
(137, 5, 'Física', 'Terça', 1, '07:00:00', '07:50:00', 'Diogo'),
(138, 5, 'Física', 'Terça', 2, '07:50:00', '08:40:00', 'Diogo'),
(139, 5, 'Matemática', 'Terça', 3, '08:40:00', '09:30:00', 'Kelvius'),
(140, 5, 'Matemática', 'Terça', 4, '09:50:00', '10:40:00', 'Kelvius'),
(141, 5, 'Inglês', 'Terça', 5, '10:40:00', '11:30:00', NULL),
(142, 5, 'Inglês', 'Terça', 6, '11:30:00', '12:20:00', NULL),
(143, 5, 'Matemática', 'Quarta', 1, '07:00:00', '07:50:00', 'Kelvius'),
(144, 5, 'Matemática', 'Quarta', 2, '07:50:00', '08:40:00', 'Kelvius'),
(145, 5, 'Biologia', 'Quarta', 3, '08:40:00', '09:30:00', 'Rodrigo'),
(146, 5, 'Biologia', 'Quarta', 4, '09:50:00', '10:40:00', 'Rodrigo'),
(147, 5, 'Língua Portuguesa', 'Quarta', 5, '10:40:00', '11:30:00', 'Marilise'),
(148, 5, 'Língua Portuguesa', 'Quarta', 6, '11:30:00', '12:20:00', 'Marilise'),
(149, 5, 'Língua Portuguesa', 'Quinta', 1, '07:00:00', '07:50:00', 'Marilise'),
(150, 5, 'Língua Portuguesa', 'Quinta', 2, '07:50:00', '08:40:00', 'Marilise'),
(151, 5, 'História', 'Quinta', 3, '08:40:00', '09:30:00', 'Luiz'),
(152, 5, 'Geografia', 'Quinta', 4, '09:50:00', '10:40:00', 'Barbosa'),
(153, 5, 'Química', 'Quinta', 5, '10:40:00', '11:30:00', 'Denis'),
(154, 5, 'Química', 'Quinta', 6, '11:30:00', '12:20:00', 'Denis'),
(155, 9, 'SENAI', 'Segunda', 1, '07:00:00', '07:45:00', NULL),
(156, 9, 'SENAI', 'Segunda', 2, '07:45:00', '08:30:00', NULL),
(157, 9, 'SENAI', 'Segunda', 3, '08:30:00', '09:15:00', NULL),
(158, 9, 'SENAI', 'Segunda', 4, '09:35:00', '10:20:00', NULL),
(159, 9, 'SENAI', 'Segunda', 5, '10:20:00', '11:05:00', NULL),
(160, 9, 'SENAI', 'Segunda', 6, '11:05:00', '11:50:00', NULL),
(161, 9, 'SENAI', 'Segunda', 7, '13:20:00', '14:05:00', NULL),
(162, 9, 'SENAI', 'Segunda', 8, '14:05:00', '14:50:00', NULL),
(163, 9, 'SENAI', 'Segunda', 9, '14:50:00', '15:35:00', NULL),
(164, 9, 'SENAI', 'Segunda', 10, '15:35:00', '16:20:00', NULL),
(165, 9, 'SENAI', 'Sexta', 1, '07:00:00', '07:45:00', NULL),
(166, 9, 'SENAI', 'Sexta', 2, '07:45:00', '08:30:00', NULL),
(167, 9, 'SENAI', 'Sexta', 3, '08:30:00', '09:15:00', NULL),
(168, 9, 'SENAI', 'Sexta', 4, '09:35:00', '10:20:00', NULL),
(169, 9, 'SENAI', 'Sexta', 5, '10:20:00', '11:05:00', NULL),
(170, 9, 'SENAI', 'Sexta', 6, '11:05:00', '11:50:00', NULL),
(171, 9, 'SENAI', 'Sexta', 7, '13:20:00', '14:05:00', NULL),
(172, 9, 'SENAI', 'Sexta', 8, '14:05:00', '14:50:00', NULL),
(173, 9, 'SENAI', 'Sexta', 9, '14:50:00', '15:35:00', NULL),
(174, 9, 'SENAI', 'Sexta', 10, '15:35:00', '16:20:00', NULL),
(175, 6, 'Química', 'Segunda', 1, '07:00:00', '07:50:00', 'Denis'),
(176, 6, 'Química', 'Segunda', 2, '07:50:00', '08:40:00', 'Denis'),
(177, 6, 'Matemática', 'Segunda', 3, '08:40:00', '09:30:00', 'Kelvius'),
(178, 6, 'Matemática', 'Segunda', 4, '09:50:00', '10:40:00', 'Kelvius'),
(179, 6, 'Inglês', 'Segunda', 5, '10:40:00', '11:30:00', NULL),
(180, 6, 'Inglês', 'Segunda', 6, '11:30:00', '12:20:00', NULL),
(181, 6, 'Física', 'Quinta', 1, '07:00:00', '07:50:00', 'Diogo'),
(182, 6, 'Física', 'Quinta', 2, '07:50:00', '08:40:00', 'Diogo'),
(183, 6, 'Geografia', 'Quinta', 3, '08:40:00', '09:30:00', 'Barbosa'),
(184, 6, 'História', 'Quinta', 4, '09:50:00', '10:40:00', 'Luiz'),
(185, 6, 'Língua Portuguesa', 'Quinta', 5, '10:40:00', '11:30:00', 'Marilise'),
(186, 6, 'Língua Portuguesa', 'Quinta', 6, '11:30:00', '12:20:00', 'Marilise'),
(187, 6, 'Matemática', 'Sexta', 1, '07:00:00', '07:50:00', 'Kelvius'),
(188, 6, 'Matemática', 'Sexta', 2, '07:50:00', '08:40:00', 'Kelvius'),
(189, 6, 'Biologia', 'Sexta', 3, '08:40:00', '09:30:00', 'Rodrigo'),
(190, 6, 'Biologia', 'Sexta', 4, '09:50:00', '10:40:00', 'Rodrigo'),
(191, 6, 'Língua Portuguesa', 'Sexta', 5, '10:40:00', '11:30:00', 'Marilise'),
(192, 6, 'Língua Portuguesa', 'Sexta', 6, '11:30:00', '12:20:00', 'Marilise'),
(193, 10, 'SENAI', 'Terça', 1, '07:00:00', '07:45:00', NULL),
(194, 10, 'SENAI', 'Terça', 2, '07:45:00', '08:30:00', NULL),
(195, 10, 'SENAI', 'Terça', 3, '08:30:00', '09:15:00', NULL),
(196, 10, 'SENAI', 'Terça', 4, '09:35:00', '10:20:00', NULL),
(197, 10, 'SENAI', 'Terça', 5, '10:20:00', '11:05:00', NULL),
(198, 10, 'SENAI', 'Terça', 6, '11:05:00', '11:50:00', NULL),
(199, 10, 'SENAI', 'Terça', 7, '13:20:00', '14:05:00', NULL),
(200, 10, 'SENAI', 'Terça', 8, '14:05:00', '14:50:00', NULL),
(201, 10, 'SENAI', 'Terça', 9, '14:50:00', '15:35:00', NULL),
(202, 10, 'SENAI', 'Terça', 10, '15:35:00', '16:20:00', NULL),
(203, 10, 'SENAI', 'Quarta', 1, '07:00:00', '07:45:00', NULL),
(204, 10, 'SENAI', 'Quarta', 2, '07:45:00', '08:30:00', NULL),
(205, 10, 'SENAI', 'Quarta', 3, '08:30:00', '09:15:00', NULL),
(206, 10, 'SENAI', 'Quarta', 4, '09:35:00', '10:20:00', NULL),
(207, 10, 'SENAI', 'Quarta', 5, '10:20:00', '11:05:00', NULL),
(208, 10, 'SENAI', 'Quarta', 6, '11:05:00', '11:50:00', NULL),
(209, 10, 'SENAI', 'Quarta', 7, '13:20:00', '14:05:00', NULL),
(210, 10, 'SENAI', 'Quarta', 8, '14:05:00', '14:50:00', NULL),
(211, 10, 'SENAI', 'Quarta', 9, '14:50:00', '15:35:00', NULL),
(212, 10, 'SENAI', 'Quarta', 10, '15:35:00', '16:20:00', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `dias_letivos`
--

CREATE TABLE `dias_letivos` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `tipo` enum('letivo','feriado','recesso') DEFAULT 'letivo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `dias_letivos`
--

INSERT INTO `dias_letivos` (`id`, `data`, `tipo`) VALUES
(1, '2026-02-16', 'feriado'),
(2, '2026-02-17', 'feriado'),
(3, '2026-04-03', 'feriado'),
(4, '2026-04-21', 'feriado'),
(5, '2026-05-01', 'feriado'),
(6, '2026-06-04', 'feriado'),
(7, '2026-09-07', 'feriado'),
(8, '2026-10-12', 'feriado'),
(9, '2026-10-28', 'feriado'),
(10, '2026-11-02', 'feriado'),
(11, '2026-11-15', 'feriado'),
(12, '2026-11-20', 'feriado'),
(13, '2026-12-25', 'feriado'),
(14, '2026-06-24', 'recesso'),
(15, '2026-06-25', 'recesso'),
(16, '2026-06-26', 'recesso'),
(17, '2026-06-27', 'recesso'),
(18, '2026-06-28', 'recesso'),
(19, '2026-06-29', 'recesso'),
(20, '2026-06-30', 'recesso'),
(21, '2026-07-01', 'recesso'),
(22, '2026-07-02', 'recesso'),
(23, '2026-07-03', 'recesso'),
(24, '2026-07-04', 'recesso'),
(25, '2026-07-05', 'recesso'),
(26, '2026-07-06', 'recesso'),
(27, '2026-07-07', 'recesso'),
(28, '2026-07-08', 'recesso'),
(29, '2026-07-09', 'recesso'),
(30, '2026-07-10', 'recesso'),
(31, '2026-07-11', 'recesso'),
(32, '2026-07-12', 'recesso'),
(33, '2026-07-13', 'recesso'),
(34, '2026-07-14', 'recesso'),
(35, '2026-07-15', 'recesso'),
(36, '2026-07-16', 'recesso'),
(37, '2026-07-17', 'recesso'),
(38, '2026-07-18', 'recesso'),
(39, '2026-07-19', 'recesso'),
(40, '2026-07-20', 'recesso'),
(41, '2026-07-21', 'recesso'),
(42, '2026-07-22', 'recesso'),
(43, '2026-07-23', 'recesso'),
(44, '2026-07-24', 'recesso'),
(45, '2026-07-25', 'recesso'),
(46, '2026-07-26', 'recesso'),
(47, '2026-01-23', 'letivo'),
(48, '2026-08-11', 'letivo'),
(49, '2026-11-19', 'letivo'),
(50, '2026-05-04', 'letivo'),
(51, '2026-08-12', 'letivo'),
(52, '2026-05-05', 'letivo'),
(53, '2026-08-13', 'letivo'),
(54, '2026-01-26', 'letivo'),
(55, '2026-05-06', 'letivo'),
(56, '2026-08-14', 'letivo'),
(57, '2026-01-27', 'letivo'),
(58, '2026-05-07', 'letivo'),
(59, '2026-11-23', 'letivo'),
(60, '2026-01-28', 'letivo'),
(61, '2026-05-08', 'letivo'),
(62, '2026-11-24', 'letivo'),
(63, '2026-01-29', 'letivo'),
(64, '2026-08-17', 'letivo'),
(65, '2026-11-25', 'letivo'),
(66, '2026-01-30', 'letivo'),
(67, '2026-08-18', 'letivo'),
(68, '2026-11-26', 'letivo'),
(69, '2026-05-11', 'letivo'),
(70, '2026-08-19', 'letivo'),
(71, '2026-11-27', 'letivo'),
(72, '2026-05-12', 'letivo'),
(73, '2026-08-20', 'letivo'),
(74, '2026-02-02', 'letivo'),
(75, '2026-05-13', 'letivo'),
(76, '2026-08-21', 'letivo'),
(77, '2026-02-03', 'letivo'),
(78, '2026-05-14', 'letivo'),
(79, '2026-11-30', 'letivo'),
(80, '2026-02-04', 'letivo'),
(81, '2026-05-15', 'letivo'),
(82, '2026-12-01', 'letivo'),
(83, '2026-02-05', 'letivo'),
(84, '2026-08-24', 'letivo'),
(85, '2026-12-02', 'letivo'),
(86, '2026-02-06', 'letivo'),
(87, '2026-08-25', 'letivo'),
(88, '2026-12-03', 'letivo'),
(89, '2026-05-18', 'letivo'),
(90, '2026-08-26', 'letivo'),
(91, '2026-12-04', 'letivo'),
(92, '2026-05-19', 'letivo'),
(93, '2026-08-27', 'letivo'),
(94, '2026-02-09', 'letivo'),
(95, '2026-05-20', 'letivo'),
(96, '2026-08-28', 'letivo'),
(97, '2026-02-10', 'letivo'),
(98, '2026-05-21', 'letivo'),
(99, '2026-12-07', 'letivo'),
(100, '2026-02-11', 'letivo'),
(101, '2026-05-22', 'letivo'),
(102, '2026-12-08', 'letivo'),
(103, '2026-02-12', 'letivo'),
(104, '2026-08-31', 'letivo'),
(105, '2026-12-09', 'letivo'),
(106, '2026-02-13', 'letivo'),
(107, '2026-09-01', 'letivo'),
(108, '2026-12-10', 'letivo'),
(109, '2026-05-25', 'letivo'),
(110, '2026-09-02', 'letivo'),
(111, '2026-12-11', 'letivo'),
(112, '2026-05-26', 'letivo'),
(113, '2026-09-03', 'letivo'),
(114, '2026-05-27', 'letivo'),
(115, '2026-09-04', 'letivo'),
(116, '2026-05-28', 'letivo'),
(117, '2026-12-14', 'letivo'),
(118, '2026-02-18', 'letivo'),
(119, '2026-05-29', 'letivo'),
(120, '2026-12-15', 'letivo'),
(121, '2026-02-19', 'letivo'),
(122, '2026-12-16', 'letivo'),
(123, '2026-02-20', 'letivo'),
(124, '2026-09-08', 'letivo'),
(125, '2026-12-17', 'letivo'),
(126, '2026-06-01', 'letivo'),
(127, '2026-09-09', 'letivo'),
(128, '2026-12-18', 'letivo'),
(129, '2026-06-02', 'letivo'),
(130, '2026-09-10', 'letivo'),
(131, '2026-02-23', 'letivo'),
(132, '2026-06-03', 'letivo'),
(133, '2026-09-11', 'letivo'),
(134, '2026-02-24', 'letivo'),
(135, '2026-12-21', 'letivo'),
(136, '2026-02-25', 'letivo'),
(137, '2026-06-05', 'letivo'),
(138, '2026-12-22', 'letivo'),
(139, '2026-02-26', 'letivo'),
(140, '2026-09-14', 'letivo'),
(141, '2026-12-23', 'letivo'),
(142, '2026-02-27', 'letivo'),
(143, '2026-09-15', 'letivo'),
(144, '2026-06-08', 'letivo'),
(145, '2026-09-16', 'letivo'),
(146, '2026-06-09', 'letivo'),
(147, '2026-09-17', 'letivo'),
(148, '2026-03-02', 'letivo'),
(149, '2026-06-10', 'letivo'),
(150, '2026-09-18', 'letivo'),
(151, '2026-03-03', 'letivo'),
(152, '2026-06-11', 'letivo'),
(153, '2026-03-04', 'letivo'),
(154, '2026-06-12', 'letivo'),
(155, '2026-03-05', 'letivo'),
(156, '2026-09-21', 'letivo'),
(157, '2026-03-06', 'letivo'),
(158, '2026-09-22', 'letivo'),
(159, '2026-06-15', 'letivo'),
(160, '2026-09-23', 'letivo'),
(161, '2026-06-16', 'letivo'),
(162, '2026-09-24', 'letivo'),
(163, '2026-03-09', 'letivo'),
(164, '2026-06-17', 'letivo'),
(165, '2026-09-25', 'letivo'),
(166, '2026-03-10', 'letivo'),
(167, '2026-06-18', 'letivo'),
(168, '2026-03-11', 'letivo'),
(169, '2026-06-19', 'letivo'),
(170, '2026-03-12', 'letivo'),
(171, '2026-09-28', 'letivo'),
(172, '2026-03-13', 'letivo'),
(173, '2026-09-29', 'letivo'),
(174, '2026-06-22', 'letivo'),
(175, '2026-09-30', 'letivo'),
(176, '2026-06-23', 'letivo'),
(177, '2026-10-01', 'letivo'),
(178, '2026-03-16', 'letivo'),
(179, '2026-10-02', 'letivo'),
(180, '2026-03-17', 'letivo'),
(181, '2026-03-18', 'letivo'),
(182, '2026-03-19', 'letivo'),
(183, '2026-10-05', 'letivo'),
(184, '2026-03-20', 'letivo'),
(185, '2026-10-06', 'letivo'),
(186, '2026-10-07', 'letivo'),
(187, '2026-10-08', 'letivo'),
(188, '2026-03-23', 'letivo'),
(189, '2026-10-09', 'letivo'),
(190, '2026-03-24', 'letivo'),
(191, '2026-03-25', 'letivo'),
(192, '2026-03-26', 'letivo'),
(193, '2026-03-27', 'letivo'),
(194, '2026-10-13', 'letivo'),
(195, '2026-10-14', 'letivo'),
(196, '2026-10-15', 'letivo'),
(197, '2026-03-30', 'letivo'),
(198, '2026-10-16', 'letivo'),
(199, '2026-03-31', 'letivo'),
(200, '2026-04-01', 'letivo'),
(201, '2026-04-02', 'letivo'),
(202, '2026-10-19', 'letivo'),
(203, '2026-10-20', 'letivo'),
(204, '2026-10-21', 'letivo'),
(205, '2026-10-22', 'letivo'),
(206, '2026-04-06', 'letivo'),
(207, '2026-10-23', 'letivo'),
(208, '2026-04-07', 'letivo'),
(209, '2026-04-08', 'letivo'),
(210, '2026-04-09', 'letivo'),
(211, '2026-10-26', 'letivo'),
(212, '2026-04-10', 'letivo'),
(213, '2026-10-27', 'letivo'),
(214, '2026-10-29', 'letivo'),
(215, '2026-04-13', 'letivo'),
(216, '2026-10-30', 'letivo'),
(217, '2026-04-14', 'letivo'),
(218, '2026-04-15', 'letivo'),
(219, '2026-04-16', 'letivo'),
(220, '2026-04-17', 'letivo'),
(221, '2026-11-03', 'letivo'),
(222, '2026-07-27', 'letivo'),
(223, '2026-11-04', 'letivo'),
(224, '2026-07-28', 'letivo'),
(225, '2026-11-05', 'letivo'),
(226, '2026-04-20', 'letivo'),
(227, '2026-07-29', 'letivo'),
(228, '2026-11-06', 'letivo'),
(229, '2026-07-30', 'letivo'),
(230, '2026-04-22', 'letivo'),
(231, '2026-07-31', 'letivo'),
(232, '2026-04-23', 'letivo'),
(233, '2026-11-09', 'letivo'),
(234, '2026-04-24', 'letivo'),
(235, '2026-11-10', 'letivo'),
(236, '2026-08-03', 'letivo'),
(237, '2026-11-11', 'letivo'),
(238, '2026-08-04', 'letivo'),
(239, '2026-11-12', 'letivo'),
(240, '2026-04-27', 'letivo'),
(241, '2026-08-05', 'letivo'),
(242, '2026-11-13', 'letivo'),
(243, '2026-04-28', 'letivo'),
(244, '2026-08-06', 'letivo'),
(245, '2026-04-29', 'letivo'),
(246, '2026-08-07', 'letivo'),
(247, '2026-04-30', 'letivo'),
(248, '2026-11-16', 'letivo'),
(249, '2026-11-17', 'letivo'),
(250, '2026-08-10', 'letivo'),
(251, '2026-11-18', 'letivo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `etapas`
--

CREATE TABLE `etapas` (
  `id` int(11) NOT NULL,
  `turma_id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `etapas`
--

INSERT INTO `etapas` (`id`, `turma_id`, `numero`, `data_inicio`, `data_fim`) VALUES
(1, 1, 1, '2026-01-23', '2026-04-30'),
(2, 2, 1, '2026-01-23', '2026-04-30'),
(3, 7, 1, '2026-01-23', '2026-04-30'),
(4, 3, 1, '2026-01-23', '2026-04-30'),
(5, 8, 1, '2026-01-23', '2026-04-30'),
(6, 4, 1, '2026-01-23', '2026-04-30'),
(7, 9, 1, '2026-01-23', '2026-04-30'),
(8, 5, 1, '2026-01-23', '2026-04-30'),
(9, 10, 1, '2026-01-23', '2026-04-30'),
(10, 6, 1, '2026-01-23', '2026-04-30'),
(16, 1, 2, '2026-05-01', '2026-08-31'),
(17, 2, 2, '2026-05-01', '2026-08-31'),
(18, 7, 2, '2026-05-01', '2026-08-31'),
(19, 3, 2, '2026-05-01', '2026-08-31'),
(20, 8, 2, '2026-05-01', '2026-08-31'),
(21, 4, 2, '2026-05-01', '2026-08-31'),
(22, 9, 2, '2026-05-01', '2026-08-31'),
(23, 5, 2, '2026-05-01', '2026-08-31'),
(24, 10, 2, '2026-05-01', '2026-08-31'),
(25, 6, 2, '2026-05-01', '2026-08-31'),
(31, 1, 3, '2026-09-01', '2026-12-23'),
(32, 2, 3, '2026-09-01', '2026-12-23'),
(33, 7, 3, '2026-09-01', '2026-12-23'),
(34, 3, 3, '2026-09-01', '2026-12-23'),
(35, 8, 3, '2026-09-01', '2026-12-23'),
(36, 4, 3, '2026-09-01', '2026-12-23'),
(37, 9, 3, '2026-09-01', '2026-12-23'),
(38, 5, 3, '2026-09-01', '2026-12-23'),
(39, 10, 3, '2026-09-01', '2026-12-23'),
(40, 6, 3, '2026-09-01', '2026-12-23');

-- --------------------------------------------------------

--
-- Estrutura para tabela `faltas`
--

CREATE TABLE `faltas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `disciplina` varchar(100) NOT NULL,
  `data` date NOT NULL,
  `aula_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `turmas`
--

CREATE TABLE `turmas` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `instituicao` varchar(20) NOT NULL,
  `carga_horaria_total` int(11) NOT NULL,
  `aulas_por_semana` int(11) NOT NULL,
  `ano_letivo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `turmas`
--

INSERT INTO `turmas` (`id`, `nome`, `instituicao`, `carga_horaria_total`, `aulas_por_semana`, `ano_letivo`) VALUES
(1, '1º Ano A', 'Sesi', 800, 30, 2026),
(2, '1º Ano B', 'Sesi', 800, 30, 2026),
(3, '2º Ano A', 'Sesi', 800, 18, 2026),
(4, '2º Ano B', 'Sesi', 800, 18, 2026),
(5, '3º Ano A', 'Sesi', 800, 18, 2026),
(6, '3º Ano B', 'Sesi', 800, 18, 2026),
(7, '2º Ano A', 'Senai', 1200, 20, 2026),
(8, '2º Ano B', 'Senai', 1200, 20, 2026),
(9, '3º Ano A', 'Senai', 1200, 20, 2026),
(10, '3º Ano B', 'Senai', 1200, 20, 2026);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `instituicao` varchar(50) NOT NULL,
  `turma` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `instituicao`, `turma`) VALUES
(1, 'Nathalia Alves', 'nathalia@teste.com', '123456', 'Sesi', '3º Ano A'),
(2, 'Naty Alves', 'nathaliaalvesabdo123@gmail.com', '123456', 'Sesi', '3º Ano A'),
(4, 'Nathalia', 'nathalia123@gmail.com', '123456', 'Sesi/Senai', '3º Ano A');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `aulas`
--
ALTER TABLE `aulas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `turma_id` (`turma_id`);

--
-- Índices de tabela `dias_letivos`
--
ALTER TABLE `dias_letivos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `data` (`data`);

--
-- Índices de tabela `etapas`
--
ALTER TABLE `etapas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `turma_id` (`turma_id`,`numero`);

--
-- Índices de tabela `faltas`
--
ALTER TABLE `faltas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `aula_id` (`aula_id`);

--
-- Índices de tabela `turmas`
--
ALTER TABLE `turmas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`,`instituicao`,`ano_letivo`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `aulas`
--
ALTER TABLE `aulas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT de tabela `dias_letivos`
--
ALTER TABLE `dias_letivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=302;

--
-- AUTO_INCREMENT de tabela `etapas`
--
ALTER TABLE `etapas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de tabela `faltas`
--
ALTER TABLE `faltas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `turmas`
--
ALTER TABLE `turmas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `aulas`
--
ALTER TABLE `aulas`
  ADD CONSTRAINT `aulas_ibfk_1` FOREIGN KEY (`turma_id`) REFERENCES `turmas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `etapas`
--
ALTER TABLE `etapas`
  ADD CONSTRAINT `etapas_ibfk_1` FOREIGN KEY (`turma_id`) REFERENCES `turmas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `faltas`
--
ALTER TABLE `faltas`
  ADD CONSTRAINT `faltas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `faltas_ibfk_2` FOREIGN KEY (`aula_id`) REFERENCES `aulas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
