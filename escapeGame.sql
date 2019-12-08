-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  Dim 08 déc. 2019 à 19:39
-- Version du serveur :  5.7.28-0ubuntu0.18.04.4
-- Version de PHP :  7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `escapeGame`
--
CREATE DATABASE escapeGame;
-- --------------------------------------------------------

--
-- Structure de la table `Enigmes`
--

CREATE TABLE `Enigmes` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `reponse` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Enigmes`
--

INSERT INTO `Enigmes` (`id`, `reponse`) VALUES
(1, '1234');

-- --------------------------------------------------------

--
-- Structure de la table `Objets`
--

CREATE TABLE `Objets` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `nom` varchar(40) NOT NULL,
  `inventaire` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Objets`
--

INSERT INTO `Objets` (`id`, `nom`, `inventaire`) VALUES
(1, 'passeport', 0),
(2, 'CAQ', 0),
(3, 'permis etude', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Enigmes`
--
ALTER TABLE `Enigmes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Objets`
--
ALTER TABLE `Objets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Enigmes`
--
ALTER TABLE `Enigmes`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Objets`
--
ALTER TABLE `Objets`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
