-- MySQL dump 10.13  Distrib 5.7.39, for Linux (x86_64)
--
-- Host: localhost    Database: head_hunter
-- ------------------------------------------------------
-- Server version	5.7.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hr`
--

DROP TABLE IF EXISTS `hr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hr` (
  `fullName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maxReservedStudents` smallint(5) unsigned NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_90bc7f7e6389312c912e5c57c0` (`userId`),
  CONSTRAINT `FK_90bc7f7e6389312c912e5c57c05` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hr`
--

LOCK TABLES `hr` WRITE;
/*!40000 ALTER TABLE `hr` DISABLE KEYS */;
INSERT INTO `hr` VALUES ('Katarzyna Wiśniewska','DEF Ltd.',10,'2023-05-17 20:09:05.741952','2023-05-17 20:09:05.741952','746293b5-8b7c-40c0-a29c-dfe8397df23a','47f6e813-2db5-4835-ac1e-179dd6c573da'),('Łukasz Nowak','ABC S.A.',7,'2023-05-17 20:08:55.734840','2023-05-17 20:08:55.734840','65163f53-2687-41c0-bfd1-3131edbaf860','c88d75f0-37a9-4025-b0cf-3d87570577fb'),('Anna Kowalska','XYZ Sp. z o.o.',5,'2023-05-17 20:08:34.687922','2023-05-17 20:08:34.687922','5bb82b5d-c80f-4a84-a8f7-4676d9f40a74','e57dd7a3-f5d6-4790-9799-14b14238f609');
/*!40000 ALTER TABLE `hr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_grades`
--

DROP TABLE IF EXISTS `student_grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_grades` (
  `courseCompletion` float NOT NULL,
  `courseEngagement` float NOT NULL,
  `projectDegree` float NOT NULL,
  `teamProjectDegree` float NOT NULL,
  `bonusProjectUrls` text COLLATE utf8mb4_unicode_ci,
  `studentId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_bb4e1d349184afff844ec0444e` (`studentId`),
  CONSTRAINT `FK_bb4e1d349184afff844ec0444e7` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_grades`
--

LOCK TABLES `student_grades` WRITE;
/*!40000 ALTER TABLE `student_grades` DISABLE KEYS */;
INSERT INTO `student_grades` VALUES (3,5,4,3,'https://github.com/annanowak/bonus1,https://github.com/annanowak/bonus2','977be50f-18b5-4d7d-81e0-a0a5190252a5','075efc75-da60-4297-9b40-41c20da67629'),(5,5,5,4,'https://github.com/nowak/bonus1,https://github.com/nowak/bonus2','df489557-235c-4d85-89d2-0c4a54ffbf1e','1140a62f-9cf7-465c-8024-c133e43eefd9'),(3,4,3,2,'https://github.com/krzysztofdudek/bonus1,https://github.com/krzysztofdudek/bonus2','ba459886-11cb-4bbd-a24e-a0e5b65993e2','11d90a60-253c-4ee2-82ee-5a08f8874ab1'),(4,5,4,5,'https://github.com/jankowalski/bonus1,https://github.com/jankowalski/bonus2','84ed5c31-453a-4caa-bdac-6735cafbd140','1d74c483-d8d3-454b-a010-721d5d58b4e9'),(3,4,2,3,'https://github.com/magdalenamichalska/bonus1,https://github.com/magdalenamichalska/bonus2','560892b8-4b46-45a2-903d-acad75f777e7','8ab92316-6588-45fc-b5da-2374c9140a99'),(4,3,5,4,'https://github.com/michalwolinski/bonus1,https://github.com/michalwolinski/bonus2','67d8382d-cb64-4c57-bb7d-4795cb4df79d','b91c9cc8-fbd0-4ca1-a4f5-772c4e02f7f0');
/*!40000 ALTER TABLE `student_grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_profiles`
--

DROP TABLE IF EXISTS `student_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_profiles` (
  `tel` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `githubUsername` varchar(39) COLLATE utf8mb4_unicode_ci NOT NULL,
  `portfolioUrls` text COLLATE utf8mb4_unicode_ci,
  `projectUrls` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `expectedTypeWork` enum('onsite','relocation_ready','remote_only','hybrid','no_preference') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no_preference',
  `targetWorkCity` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expectedContractType` enum('uop_only','b2b_possible','uz_uod_possible','no_preference') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no_preference',
  `expectedSalary` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `canTakeApprenticeship` tinyint(4) NOT NULL DEFAULT '0',
  `monthsOfCommercialExp` int(11) NOT NULL DEFAULT '0',
  `education` text COLLATE utf8mb4_unicode_ci,
  `workExperience` text COLLATE utf8mb4_unicode_ci,
  `courses` text COLLATE utf8mb4_unicode_ci,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `studentId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_cbe68b805a218da28855f1a618` (`githubUsername`),
  UNIQUE KEY `REL_fba1564f2a000c352d97269c31` (`studentId`),
  CONSTRAINT `FK_fba1564f2a000c352d97269c311` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_profiles`
--

LOCK TABLES `student_profiles` WRITE;
/*!40000 ALTER TABLE `student_profiles` DISABLE KEYS */;
INSERT INTO `student_profiles` VALUES ('+48-123-456-789','Jan','Kowalski','jankowalski','https://jankowalski.com/portfolio1,https://jankowalski.com/portfolio2','https://jankowalski.com/project1,https://jankowalski.com/project2','Pasjonat programowania z doświadczeniem w różnych technologiach webowych.','hybrid','Warszawa','no_preference','7000',1,18,'Inżynier Informatyki, Politechnika Warszawska','2 lata doświadczenia jako programista webowy w firmie XYZ.','Web Development, Machine Learning, Cloud Computing','2023-05-17 20:25:52.506302','2023-05-17 20:25:52.506302','84ed5c31-453a-4caa-bdac-6735cafbd140','0b075030-14c1-41cb-b20e-baa7b3a271d0'),('+48-456-789-123','Adam','Nowak','adamnowak','https://adamnowak.com/portfolio1,https://adamnowak.com/portfolio2','https://adamnowak.com/project1,https://adamnowak.com/project2','Pasjonat Machine Learning, z doświadczeniem w Python i Tensorflow.','remote_only','Wrocław','b2b_possible','10000',0,12,'Master of Science in Data Science','1 rok doświadczenia jako Data Scientist w firmie DEF.','Machine Learning, Data Science, Web Development','2023-05-17 20:29:56.012741','2023-05-17 20:29:56.012741','df489557-235c-4d85-89d2-0c4a54ffbf1e','22e09ae3-0e7c-454b-8309-1c5bf53b043f'),('+48-987-654-321','Krzysztof','Dudek','krzysztofdudek','https://krzysztofdudek.com/portfolio1,https://krzysztofdudek.com/portfolio2','https://krzysztofdudek.com/project1,https://krzysztofdudek.com/project2','Zafascynowany technologią blockchain, z doświadczeniem w Solidity i Ethereum.','onsite','Kraków','uop_only','9000',0,24,'Bachelor of Science in Computer Science','2 lata doświadczenia jako deweloper blockchain w firmie ABC.','Blockchain Development, Web Development','2023-05-17 20:27:19.361043','2023-05-17 20:27:19.361043','ba459886-11cb-4bbd-a24e-a0e5b65993e2','30005d55-c783-4e33-b4a5-2e6044e7d75f');
/*!40000 ALTER TABLE `student_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_e0208b4f964e609959aff431bf` (`userId`),
  CONSTRAINT `FK_e0208b4f964e609959aff431bf9` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES ('2023-05-17 20:16:32.046854','2023-05-17 20:16:32.046854','49d1997b-98ee-43d0-9454-d9ed1f1b2f14','560892b8-4b46-45a2-903d-acad75f777e7'),('2023-05-17 20:16:32.048601','2023-05-17 20:16:32.048601','05a64d26-1dc1-42b7-a20c-e87273e7648b','67d8382d-cb64-4c57-bb7d-4795cb4df79d'),('2023-05-17 20:16:32.044293','2023-05-17 20:16:32.044293','b439901f-d4c8-4fc2-8833-1ae4275ee91f','84ed5c31-453a-4caa-bdac-6735cafbd140'),('2023-05-17 20:16:32.041259','2023-05-17 20:16:32.041259','49d0c3ea-c284-4bce-841a-d8f3a0a520f8','977be50f-18b5-4d7d-81e0-a0a5190252a5'),('2023-05-17 20:16:32.047580','2023-05-17 20:16:32.047580','e6966c62-5f63-4714-b25b-83cd515b2ccb','ba459886-11cb-4bbd-a24e-a0e5b65993e2'),('2023-05-17 20:16:32.043575','2023-05-17 20:16:32.043575','4a4c29e0-f238-4b89-a4ea-55245b21f516','df489557-235c-4d85-89d2-0c4a54ffbf1e');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens_activation`
--

DROP TABLE IF EXISTS `tokens_activation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens_activation` (
  `hashToken` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isUsed` tinyint(4) NOT NULL DEFAULT '0',
  `expiresIn` bigint(20) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_a81e4589637537c9acc0df58f6` (`hashToken`),
  KEY `FK_15a364b648a73a51a14908b1c65` (`userId`),
  CONSTRAINT `FK_15a364b648a73a51a14908b1c65` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens_activation`
--

LOCK TABLES `tokens_activation` WRITE;
/*!40000 ALTER TABLE `tokens_activation` DISABLE KEYS */;
INSERT INTO `tokens_activation` VALUES ('$2b$10$Qw5BkMf3cTUIBmI3LK1qtO1H/PhDTaGlfOhsQXhHfqJgmHFNUn2/2',0,1684390114755,'2023-05-17 20:08:34.758122','2023-05-17 20:08:34.758122','5bb82b5d-c80f-4a84-a8f7-4676d9f40a74','01c4abcc-12dd-4b00-816f-06aaf96be1b6'),('$2b$10$.1pPo/oCf.aCPROI9hIsbeMMpszNvfOQ6bXP.65EgCR8Jg/8PDrPW',0,1684390145799,'2023-05-17 20:09:05.802310','2023-05-17 20:09:05.802310','746293b5-8b7c-40c0-a29c-dfe8397df23a','2d6b9b50-17a6-461a-bc41-1049fa90daf1'),('$2b$10$VAyrJSWKk6LBDuEXe3lS7.ilbTdof.8m/YH1WWhGTwO7tpOFjxSdK',0,1684390592196,'2023-05-17 20:16:32.198198','2023-05-17 20:16:32.198198','e6966c62-5f63-4714-b25b-83cd515b2ccb','7eaa6380-bf99-4503-9baa-60d04103fb7a'),('$2b$10$EwZWPFmWLpJJNx.kwN7GeuCckdX0j0C5g6piPmIRwL6HpiEFMr.e2',0,1684390592192,'2023-05-17 20:16:32.194614','2023-05-17 20:16:32.194614','05a64d26-1dc1-42b7-a20c-e87273e7648b','8606f915-83d1-466f-8db7-9ce4e3699165'),('$2b$10$mvpx0LVFTyDSo1V/mP6tAe5ffLT0uuzYXkjt0w5acdNWm7EPQGTVa',0,1684390592195,'2023-05-17 20:16:32.196885','2023-05-17 20:16:32.196885','49d1997b-98ee-43d0-9454-d9ed1f1b2f14','a25c1874-26a1-41a1-a259-2132ae06267c'),('$2b$10$v7QhyC3y.FEOChpp8Ix/2uBzuHJPzpq.b/N1uC6vn5eyPhyRwpCUS',0,1684390592135,'2023-05-17 20:16:32.137612','2023-05-17 20:16:32.137612','49d0c3ea-c284-4bce-841a-d8f3a0a520f8','a30ed1ab-f2cb-4618-9da2-7e7c93754fc2'),('$2b$10$RbrSvstToRvw2mnHlf2NkeOZo3aJXojI8GtVa9Q/uZbYXfVT5ZNAK',0,1684390592135,'2023-05-17 20:16:32.138050','2023-05-17 20:16:32.138050','b439901f-d4c8-4fc2-8833-1ae4275ee91f','beafde29-e7de-4b3e-bb81-91bf8dde337c'),('$2b$10$kcWjztySgWH0OjexY2./pecYHVupqF7TtFPbfO9xBBxfSUfC2fpyO',0,1684390592140,'2023-05-17 20:16:32.142610','2023-05-17 20:16:32.142610','4a4c29e0-f238-4b89-a4ea-55245b21f516','d0ba21a4-830e-4ae3-827d-27bab57d4c3c'),('$2b$10$Uf8Mp85MiHYLni/GmTOtLepSmaYqXn344fSFvwaJ3oir8hAGuBt8K',0,1684390135793,'2023-05-17 20:08:55.795758','2023-05-17 20:08:55.795758','65163f53-2687-41c0-bfd1-3131edbaf860','d10078e7-0942-49c3-904d-4e70fe2ba1c1');
/*!40000 ALTER TABLE `tokens_activation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens_password_reset`
--

DROP TABLE IF EXISTS `tokens_password_reset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens_password_reset` (
  `hashToken` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isUsed` tinyint(4) NOT NULL DEFAULT '0',
  `expiresIn` bigint(20) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_6661c6736597da44d434b87065` (`hashToken`),
  KEY `FK_0f922e3ba7d33c63eec92e4f46e` (`userId`),
  CONSTRAINT `FK_0f922e3ba7d33c63eec92e4f46e` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens_password_reset`
--

LOCK TABLES `tokens_password_reset` WRITE;
/*!40000 ALTER TABLE `tokens_password_reset` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens_password_reset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens_refresh`
--

DROP TABLE IF EXISTS `tokens_refresh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens_refresh` (
  `hashToken` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isUsed` tinyint(4) NOT NULL DEFAULT '0',
  `expiresIn` bigint(20) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_1f91d27edacc7cadafabc724d5` (`hashToken`),
  KEY `FK_71e2f2988da529da581aaa88128` (`userId`),
  CONSTRAINT `FK_71e2f2988da529da581aaa88128` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens_refresh`
--

LOCK TABLES `tokens_refresh` WRITE;
/*!40000 ALTER TABLE `tokens_refresh` DISABLE KEYS */;
INSERT INTO `tokens_refresh` VALUES ('$2b$10$jzJhUTPQRbhL4JowcIaFcu3AYCXvh1Z8CRFpqxzA7PGvWSV5T7TDe',1,1684712803061,'2023-05-17 19:46:43.065858','2023-05-17 20:16:27.000000','1bd217da-7bfb-4716-8d3b-42007de6822f','38b0768d-f042-4088-95e8-31e3424da445'),('$2b$10$NJ1T0nNDAwqNDbe30vgBw.Pa/ksycDh2i6Li6KeYW3bzsxN6s.PCG',1,1684715105112,'2023-05-17 20:25:05.115467','2023-05-17 20:26:05.000000','b439901f-d4c8-4fc2-8833-1ae4275ee91f','4c6ee18f-5a62-4a92-99ac-ebd644a2e4d4'),('$2b$10$vod3sbzvRi9E6izlWwqume4Hr26NZXRrUVDhAd/wwwTuLfqlE8x3i',0,1684715235472,'2023-05-17 20:27:15.475362','2023-05-17 20:27:15.475362','e6966c62-5f63-4714-b25b-83cd515b2ccb','a35038f9-8f01-448c-a778-78c73eed42e3'),('$2b$10$zigkh5tvrEEQgRf5TFxkK.nmRpgj5x2IYWDqOMO7Bo.RywZ0JHHLS',1,1684715355039,'2023-05-17 20:29:15.041715','2023-05-17 20:32:17.000000','4a4c29e0-f238-4b89-a4ea-55245b21f516','b23524d6-a9f0-4f1f-bc2b-44a3da39c241'),('$2b$10$OOZQ3h3pZsam1srg6jTbouSj5/qt7JaNS3knHd9bNP5O32t3yAQDe',1,1684712467161,'2023-05-17 19:41:07.173222','2023-05-17 19:46:42.000000','1bd217da-7bfb-4716-8d3b-42007de6822f','bafea86f-612f-4866-a831-e9a838c781a1'),('$2b$10$i5qQwngjsBzoTsn2Ka91XOcqHnIrj.y5xrB9stSQ8./cvCySYWPdG',0,1684714587178,'2023-05-17 20:16:27.180999','2023-05-17 20:16:27.180999','1bd217da-7bfb-4716-8d3b-42007de6822f','bc655ec5-788b-4dbb-ae77-0f8a0f3729a1'),('$2b$10$pZEag3krCW3k2hq9L3z9res4uY5miOd1HLMsKbR.8nsFXX7iIs1wq',0,1684715537660,'2023-05-17 20:32:17.677079','2023-05-17 20:32:17.677079','4a4c29e0-f238-4b89-a4ea-55245b21f516','ccd23f1d-c12f-4292-9f76-410d2c439828'),('$2b$10$3MjGX1Tc4nInj17m6Gl.WeZE2.90L1Ymmx3U1NpsXz9usmrWrR2fO',0,1684714543927,'2023-05-17 20:15:43.930323','2023-05-17 20:15:43.930323','746293b5-8b7c-40c0-a29c-dfe8397df23a','d749e57b-0db9-445b-8845-02c782eb482f');
/*!40000 ALTER TABLE `tokens_refresh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashPwd` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('admin','student','hr') COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT '0',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('michal.wolinski@example.com',NULL,'student',0,'2023-05-17 20:16:32.038400','2023-05-17 20:16:32.038400','05a64d26-1dc1-42b7-a20c-e87273e7648b'),('jakubkrol@megak.pl','$2b$10$gjjEJTqhzK51OVU1n/a/xOcZWGGPEq9cGTAfUERWY5Xzeq55MQEqq','admin',1,'2023-05-17 19:33:30.150986','2023-05-17 19:33:30.000000','1bd217da-7bfb-4716-8d3b-42007de6822f'),('lukasz.ostrowski@example.com',NULL,'student',0,'2023-05-17 20:16:32.030327','2023-05-17 20:16:32.030327','49d0c3ea-c284-4bce-841a-d8f3a0a520f8'),('magdalena.michalska@example.com',NULL,'student',0,'2023-05-17 20:16:32.037672','2023-05-17 20:16:32.037672','49d1997b-98ee-43d0-9454-d9ed1f1b2f14'),('adam.nowak@example.com','$2b$10$2DXoru/Lvpx3t2BWSuRYpeBqLL9vnUla10l9Ep.jsTM2NN1M47QSS','student',1,'2023-05-17 20:16:32.034866','2023-05-17 20:21:27.000000','4a4c29e0-f238-4b89-a4ea-55245b21f516'),('anna.kowalska@xyz.pl','$2b$10$audZq8gk6J1fJH/zVriI7O3w4XlNhAjRJTlxWucU5RRsgQrP5GE82','hr',1,'2023-05-17 20:08:34.666055','2023-05-17 20:14:54.000000','5bb82b5d-c80f-4a84-a8f7-4676d9f40a74'),('lukasz.nowak@abc.com','$2b$10$r6bDYJ/UkxiiT6NHywJlLeJ3r/ZJ6RyG3GjFxl8u2M.kJKBqVmyVe','hr',1,'2023-05-17 20:08:55.727597','2023-05-17 20:15:11.000000','65163f53-2687-41c0-bfd1-3131edbaf860'),('katarzyna.wisniewska@def.net','$2b$10$di4NYp4j8TM0YmTHW79.t.DreanflUKVGASZwTLCKN0ShwVffV/Tq','hr',1,'2023-05-17 20:09:05.724035','2023-05-17 20:15:26.000000','746293b5-8b7c-40c0-a29c-dfe8397df23a'),('jan.kowalski@example.com','$2b$10$CRruyUdtt9.j3hLrFu/xN.9mnDSM/AvtBS2pDKZgu0N9jBc6DCzJC','student',1,'2023-05-17 20:16:32.034539','2023-05-17 20:18:27.000000','b439901f-d4c8-4fc2-8833-1ae4275ee91f'),('krzysztof.dudek@example.com','$2b$10$hHFAXzsYW3li/T4Ki8PYA.vh5nWW6nArHfUsQxo1USdOtEGOpXyrW','student',1,'2023-05-17 20:16:32.037964','2023-05-17 20:20:47.000000','e6966c62-5f63-4714-b25b-83cd515b2ccb');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-17 20:34:19
