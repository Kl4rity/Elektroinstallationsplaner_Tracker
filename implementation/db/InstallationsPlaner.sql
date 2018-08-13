-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 13, 2018 at 03:10 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uebung3`
--

-- --------------------------------------------------------

--
-- Table structure for table `circuit_breakers`
--

CREATE TABLE `circuit_breakers` (
  `id` int(11) UNSIGNED NOT NULL,
  `projects_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_changed` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `circuit_breakers`
--

INSERT INTO `circuit_breakers` (`id`, `projects_id`, `name`, `created`, `last_changed`) VALUES
(1, 1, 'Main Breaker', '2018-08-13 11:26:25', NULL),
(2, 1, 'Secondary Breaker', '2018-08-13 11:26:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` int(10) UNSIGNED NOT NULL,
  `rooms_id` int(10) UNSIGNED NOT NULL,
  `fuses_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`id`, `rooms_id`, `fuses_id`, `name`, `created`, `last_change`) VALUES
(1, 1, 1, 'Licht', '2018-04-17 14:21:04', NULL),
(2, 1, 1, 'Rollo', '2018-04-17 14:21:04', NULL),
(3, 1, 2, 'Licht', '2018-04-17 14:21:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `floors`
--

CREATE TABLE `floors` (
  `id` int(11) UNSIGNED NOT NULL,
  `projects_id` int(11) UNSIGNED NOT NULL,
  `floor_count_from_basement` int(11) DEFAULT NULL COMMENT '0 is basement',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `floors`
--

INSERT INTO `floors` (`id`, `projects_id`, `floor_count_from_basement`, `name`, `created`, `last_change`) VALUES
(3, 1, 2, 'zweiter Stock 3', '2018-04-17 14:11:07', NULL),
(4, 2, 1, 'Tiefgarage 28', '2018-04-17 14:11:07', NULL),
(19, 1, 1, 'Erdgeschoss 2', '2018-05-29 13:45:47', NULL),
(20, 0, 2, 'Gebäude 1201 Wien', '2018-06-20 15:45:06', NULL),
(21, 0, 2, 'Kuckuck', '2018-06-27 10:52:10', NULL),
(22, 0, 3, 'Hola', '2018-06-27 10:54:46', NULL),
(23, 0, 2, 'Hola.', '2018-06-27 10:55:01', NULL),
(24, 0, 1, 'Kuckuck', '2018-06-27 10:55:59', NULL),
(25, 0, 2, 'Kuckuck', '2018-06-27 10:56:11', NULL),
(26, 0, 2, 'Kuckuck', '2018-06-27 10:58:46', NULL),
(27, 1, 2, 'Kuckuck', '2018-06-27 10:59:12', NULL),
(29, 2, 2, 'Kuckuck 2', '2018-06-27 12:31:40', '2018-06-29 16:53:38'),
(31, 2, 0, 'Up arrow nach links. Still works?', '2018-06-29 16:55:52', '2018-07-03 09:26:05'),
(32, 2, 0, 'Weiß hinterlegte Navbar für aktives Element.', '2018-06-29 17:04:29', NULL),
(33, 2, 2, 'Kuckuck 72', '2018-07-03 09:51:03', '2018-07-03 12:46:17');

-- --------------------------------------------------------

--
-- Table structure for table `fuses`
--

CREATE TABLE `fuses` (
  `name` varchar(255) NOT NULL,
  `circuit_breakers_id` int(11) UNSIGNED NOT NULL,
  `id` int(11) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_changed` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fuses`
--

INSERT INTO `fuses` (`name`, `circuit_breakers_id`, `id`, `created`, `last_changed`) VALUES
('Küche', 1, 1, '2018-08-13 11:27:19', NULL),
('Bad', 1, 2, '2018-08-13 11:27:19', NULL),
('Modelleisenbahnzimmer', 2, 3, '2018-08-13 11:27:50', NULL),
('Mario Kart Zimmer', 2, 4, '2018-08-13 11:27:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `created`, `last_change`) VALUES
(1, '', '2018-04-17 14:10:04', '2018-08-13 11:29:30'),
(2, 'Hola 62', '2018-04-17 14:10:04', '2018-07-03 12:39:47');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(10) UNSIGNED NOT NULL,
  `floors_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `floors_id`, `name`, `created`, `last_change`) VALUES
(1, 3, 'gesamter Keller', '2018-04-17 14:14:24', NULL),
(2, 2, 'Stiegenhaus', '2018-04-17 14:14:24', NULL),
(3, 2, 'Vorzimmer', '2018-04-17 14:14:24', NULL),
(4, 2, 'WC', '2018-04-17 14:14:24', NULL),
(5, 2, 'Küche', '2018-04-17 14:14:24', NULL),
(6, 2, 'Wohnzimmer', '2018-04-17 14:14:24', NULL),
(7, 2, 'Gästezimmer', '2018-04-17 14:14:24', NULL),
(8, 2, 'Gäste Bad und WC', '2018-04-17 14:14:24', NULL),
(9, 3, 'Schlafzimmer 1', '2018-04-17 14:14:24', NULL),
(10, 3, 'Küche 4', '2018-04-17 14:14:24', NULL),
(11, 3, 'Hola 3', '2018-04-17 14:14:24', NULL),
(12, 3, 'WC 3', '2018-04-17 14:14:24', NULL),
(15, 5, 'Aula', '2018-04-17 14:14:24', NULL),
(16, 5, 'WC Herren', '2018-04-17 14:17:19', NULL),
(17, 5, 'WC Damen', '2018-04-17 14:17:19', NULL),
(18, 5, 'Küche', '2018-04-17 14:17:19', NULL),
(19, 5, 'Putzkammer', '2018-04-17 14:17:19', NULL),
(20, 6, 'Konferenzzimmer', '2018-04-17 14:17:19', NULL),
(21, 6, 'Schulwartzimmer', '2018-04-17 14:17:19', NULL),
(22, 6, 'Krankenstation', '2018-04-17 14:17:19', NULL),
(23, 6, 'Lehrer WC', '2018-04-17 14:17:19', NULL),
(24, 7, 'WC Damen', '2018-04-17 14:17:19', NULL),
(25, 7, 'WC Herren', '2018-04-17 14:17:19', NULL),
(26, 7, 'Klassenzimmer 1A', '2018-04-17 14:17:19', NULL),
(27, 7, 'Klassenzimmer 1B', '2018-04-17 14:17:19', NULL),
(28, 7, 'Klassenzimmer 2A', '2018-04-17 14:17:19', NULL),
(29, 7, 'Klassenzimmer 2B', '2018-04-17 14:17:19', NULL),
(30, 7, 'Klassenzimmer 3A', '2018-04-17 14:17:19', NULL),
(31, 7, 'Klassenzimmer 3B', '2018-04-17 14:18:51', NULL),
(32, 8, 'WC Damen', '2018-04-17 14:18:51', NULL),
(33, 8, 'WC Herren', '2018-04-17 14:18:51', NULL),
(34, 8, 'Klassenzimmer 4A', '2018-04-17 14:18:51', NULL),
(35, 8, 'Klassenzimmer 4B', '2018-04-17 14:18:51', NULL),
(36, 8, 'Biologiesaal', '2018-04-17 14:18:51', NULL),
(37, 8, 'Phyisksaal', '2018-04-17 14:18:51', NULL),
(38, 8, 'Zeichensaal', '2018-04-17 14:18:51', NULL),
(39, 8, 'Aufenthaltsraum', '2018-04-17 14:18:51', NULL),
(40, 19, 'Kuckuck', '2018-06-27 12:20:30', NULL),
(41, 19, 'Hola', '2018-06-27 12:21:38', NULL),
(42, 27, 'Hola.', '2018-06-27 12:25:59', NULL),
(43, 4, 'TestDingens 44', '2018-06-27 12:34:22', NULL),
(47, 29, 'dsadas', '2018-06-27 13:15:20', NULL),
(48, 27, 'dad', '2018-06-27 13:26:23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sensors`
--

CREATE TABLE `sensors` (
  `id` int(10) UNSIGNED NOT NULL,
  `devices_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `unit` varchar(16) CHARACTER SET utf8 NOT NULL,
  `value` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_change` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sensors`
--

INSERT INTO `sensors` (`id`, `devices_id`, `name`, `unit`, `value`, `created`, `last_change`) VALUES
(1, 1, 'Lichtschalter', 'EIN / AUS', 'EIN', '2018-04-17 14:21:47', NULL),
(2, 1, 'Helligkeitssensor', 'Lumen', NULL, '2018-04-17 14:21:47', NULL),
(5, 2, 'Helligkeitssensor', 'Lumen', NULL, '2018-04-17 14:23:08', NULL),
(6, 3, 'Lichtschalter', 'EIN / AUS', 'EIN', '2018-04-17 14:21:47', NULL),
(7, 3, 'Helligkeitssensor', 'Lumen', NULL, '2018-04-17 14:21:47', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `circuit_breakers`
--
ALTER TABLE `circuit_breakers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `floors`
--
ALTER TABLE `floors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fuses`
--
ALTER TABLE `fuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sensors`
--
ALTER TABLE `sensors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `circuit_breakers`
--
ALTER TABLE `circuit_breakers`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `floors`
--
ALTER TABLE `floors`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `fuses`
--
ALTER TABLE `fuses`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
