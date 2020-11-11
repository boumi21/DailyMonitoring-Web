-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 11 nov. 2020 à 22:28
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `tx52`
--

-- --------------------------------------------------------

--
-- Structure de la table `possede`
--

DROP TABLE IF EXISTS `possede`;
CREATE TABLE IF NOT EXISTS `possede` (
  `NUM_QUESTION` int(11) NOT NULL,
  `NUM_REPONSE` int(11) NOT NULL,
  `NUM_QUESTION_SUIVANTE` int(11) DEFAULT NULL,
  PRIMARY KEY (`NUM_QUESTION`,`NUM_REPONSE`),
  KEY `I_FK_POSSEDE_QUESTION` (`NUM_QUESTION`),
  KEY `I_FK_POSSEDE_REPONSE` (`NUM_REPONSE`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `possede`
--

INSERT INTO `possede` (`NUM_QUESTION`, `NUM_REPONSE`, `NUM_QUESTION_SUIVANTE`) VALUES
(1, 8, 2),
(1, 9, 7),
(2, 1, 8),
(2, 2, 8),
(7, 10, NULL),
(7, 11, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `NUM_QUESTION` int(11) NOT NULL AUTO_INCREMENT,
  `QUESTION` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`NUM_QUESTION`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `question`
--

INSERT INTO `question` (`NUM_QUESTION`, `QUESTION`) VALUES
(1, 'Comment allez-vous ?'),
(2, 'Avez-vous bien dormi ?'),
(5, 'Quel est votre pouls ?'),
(7, 'Avez-vous de la tension ?'),
(8, 'Avez-vous un bon appétit ?');

-- --------------------------------------------------------

--
-- Structure de la table `questionnaire`
--

DROP TABLE IF EXISTS `questionnaire`;
CREATE TABLE IF NOT EXISTS `questionnaire` (
  `NUM_QUESTIONNAIRE` int(11) NOT NULL AUTO_INCREMENT,
  `NUM_PREMIERE_QUESTION` int(11) DEFAULT NULL,
  `NOM_QUESTIONNAIRE` varchar(128) NOT NULL,
  PRIMARY KEY (`NUM_QUESTIONNAIRE`),
  KEY `I_FK_QUESTIONNAIRE_QUESTION` (`NUM_PREMIERE_QUESTION`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `questionnaire`
--

INSERT INTO `questionnaire` (`NUM_QUESTIONNAIRE`, `NUM_PREMIERE_QUESTION`, `NOM_QUESTIONNAIRE`) VALUES
(1, 5, 'TX52');

-- --------------------------------------------------------

--
-- Structure de la table `reponse`
--

DROP TABLE IF EXISTS `reponse`;
CREATE TABLE IF NOT EXISTS `reponse` (
  `NUM_REPONSE` int(11) NOT NULL AUTO_INCREMENT,
  `REPONSE` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`NUM_REPONSE`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `reponse`
--

INSERT INTO `reponse` (`NUM_REPONSE`, `REPONSE`) VALUES
(1, 'Oui'),
(2, 'Non'),
(3, 'Moyen'),
(8, 'Je me sens bien'),
(9, 'Je ne suis pas très bien'),
(10, '< 100'),
(11, '> 140');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `possede`
--
ALTER TABLE `possede`
  ADD CONSTRAINT `possede_ibfk_1` FOREIGN KEY (`NUM_QUESTION`) REFERENCES `question` (`NUM_QUESTION`),
  ADD CONSTRAINT `possede_ibfk_2` FOREIGN KEY (`NUM_REPONSE`) REFERENCES `reponse` (`NUM_REPONSE`);

--
-- Contraintes pour la table `questionnaire`
--
ALTER TABLE `questionnaire`
  ADD CONSTRAINT `questionnaire_ibfk_1` FOREIGN KEY (`NUM_PREMIERE_QUESTION`) REFERENCES `question` (`NUM_QUESTION`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
