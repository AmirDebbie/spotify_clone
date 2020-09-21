CREATE DATABASE  IF NOT EXISTS `spotify_clone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spotify_clone`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: spotify_clone
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `artist_id` int NOT NULL,
  `name` varchar(40) NOT NULL,
  `cover_img` varchar(400) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `upload_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (1,1,'Best Of Both Worlds','https://upload.wikimedia.org/wikipedia/en/5/51/Best_of_Both_Worlds_Concert.png','2010-01-01','2020-09-09'),(2,1,'Hannah Montana','https://upload.wikimedia.org/wikipedia/en/5/5e/Hannah_Montana_soundtrack.png','2006-10-24','2020-09-09'),(3,4,'When We All Fall Asleep, Where Do We Go?','https://upload.wikimedia.org/wikipedia/en/3/38/When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png','2019-10-24','2020-09-09'),(4,4,'Don\'t Smile at Me','https://target.scene7.com/is/image/Target/GUEST_d7dba870-822b-45a7-9e19-53db3bd93933?wid=488&hei=488&fmt=pjpeg','2015-10-24','2020-09-09'),(5,5,'Osef Hashmal','https://upload.wikimedia.org/wikipedia/he/thumb/1/1b/%D7%90%D7%95%D7%A1%D7%A3_%D7%94%D7%97%D7%A9%D7%9E%D7%9C.jpeg/250px-%D7%90%D7%95%D7%A1%D7%A3_%D7%94%D7%97%D7%A9%D7%9E%D7%9C.jpeg','2018-10-24','2020-09-09'),(6,6,'Fine Line','https://upload.wikimedia.org/wikipedia/he/2/2c/Fine_Line.jpg','2019-10-24','2020-09-09');
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `cover_img` varchar(400) DEFAULT NULL,
  `upload_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1,'Hannah Montana','https://images-na.ssl-images-amazon.com/images/I/61BQ2QZf8vL._SX258_BO1,204,203,200_.jpg','2020-09-08'),(4,'Billie Eilish','https://data.whicdn.com/images/337025371/original.jpg','2020-09-08'),(5,'Dudu Faruk','https://yosmusic.com/wp-content/uploads/2019/05/%D7%93%D7%95%D7%93%D7%95-%D7%A4%D7%90%D7%A8%D7%95%D7%A7-1.jpg','2020-09-08'),(6,'Harry Styles','https://www.nydailynews.com/resizer/SJ4FiF8plWhEe2oV6IAUTE2ge6g=/1200x960/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/M44UHJVSUZB4HGJFZZOYFJZTSQ.jpg','2020-09-08'),(7,'Omer Adam','https://www.acapellas4u.co.uk/wp-content/uploads/2019/04/img_5cb67ab164155.jpg','2020-09-09'),(8,'Nickelback','https://pyxis.nymag.com/v1/imgs/b2e/f12/003a22d2dd29bf43ed92af8be17c2a9435-24-nickelback.rsquare.w330.jpg','2020-09-08'),(9,'Avenged Sevenfold','https://secondhandsongs.com/picture/281959','2020-09-08'),(10,'Noroz','https://images.genius.com/4db3825623ae94ebf9a08deb4e529d9d.900x900x1.jpg','2020-09-09'),(11,'The Weeknd','https://www.femalefirst.co.uk/image-library/square/1000/t/the-weeknd-promo-shot.jpg','2020-09-08'),(12,'Drake','https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQ3NTI2OTA4NzY5MjE2MTI4/drake_photo_by_prince_williams_wireimage_getty_479503454.jpg','2020-09-09'),(13,'DaBaby','https://pyxis.nymag.com/v1/imgs/a0c/94c/50205b986d1b86a03f90b2c49a5ee0d467-dababy.rsquare.w1200.jpg','2020-09-08');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;

--
-- Table structure for table `interactions`
--

DROP TABLE IF EXISTS `interactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `song_id` int NOT NULL,
  `play_count` int DEFAULT '0',
  `liked` tinyint(1) DEFAULT '0',
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `interactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `interactions_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interactions`
--

/*!40000 ALTER TABLE `interactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `interactions` ENABLE KEYS */;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `cover_img` varchar(400) DEFAULT NULL,
  `upload_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--

/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
INSERT INTO `playlists` VALUES (2,'Best Of Billie Eilish','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTSqgaMM8fgueq_aqZicFoVOa_wsDfcM55APw&usqp=CAU','2020-09-09'),(3,'Amir Debbie','https://vignette.wikia.nocookie.net/simpsons/images/c/c2/Peter_Griffin.png/revision/latest/top-crop/width/360/height/360?cb=20131027121705','2020-09-13');
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `youtube_link` varchar(400) DEFAULT NULL,
  `album_id` int NOT NULL,
  `artist_id` int NOT NULL,
  `title` varchar(40) NOT NULL,
  `length` time DEFAULT NULL,
  `track_number` int DEFAULT NULL,
  `lyrics` text,
  `created_at` date DEFAULT NULL,
  `upload_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `album_id` (`album_id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`),
  CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (3,'https://www.youtube.com/watch?v=uVjRe8QXFHY&ab_channel=DisneyMusicVEVO',1,1,'Best Of Both Worlds','00:03:26',1,'you get the besssstttt of both worlds!!!','2010-09-09','2020-09-09'),(6,'https://www.youtube.com/watch?v=DyDfgMOUjCI',3,4,'Bad Guy','00:03:15',1,'I M THE BAD GUY','2018-01-01','2020-09-09'),(7,'https://www.youtube.com/watch?v=LZyybvVx-js',3,4,'Xanny','00:04:05',2,'XannyXannyXannyXanny','2018-01-01','2020-09-09'),(8,'https://www.youtube.com/watch?v=Ah0Ys50CqO8',3,4,'You Should See Me in a Crown','00:03:05',3,'You Should See Me in a Crown','2018-01-01','2020-09-09'),(9,'https://www.youtube.com/watch?v=rdKK3OMyLxs&list=PLA_EomK28tUHZpMyV_gjoLvcym6SYtXUe&ab_channel=BillieEilish-Topic',4,4,'COPYCAT','00:03:15',1,'COPYCATAT','2017-12-22','2020-09-10'),(10,'https://www.youtube.com/watch?v=MDedqBwm-yI&list=PLA_EomK28tUHZpMyV_gjoLvcym6SYtXUe&index=2&ab_channel=BillieEilish-Topic',4,4,'idontwannabeyouanymore','00:03:23',2,'idontwannabeyouanymore','2017-12-22','2020-09-10'),(11,'https://www.youtube.com/watch?v=EmMZDOupR68&list=PLA_EomK28tUHZpMyV_gjoLvcym6SYtXUe&index=3&ab_channel=BillieEilish-Topic',4,4,'my boy','00:02:50',3,'my boy','2017-12-22','2020-09-10'),(12,'https://www.youtube.com/watch?v=V47CAl52Tdo&list=PLA_EomK28tUHZpMyV_gjoLvcym6SYtXUe&index=4&ab_channel=BillieEilish-Topic',4,4,'watch','00:02:57',4,'watch','2017-12-22','2020-09-10'),(13,'https://www.youtube.com/watch?v=ADZalnqEyx0&list=PLA_EomK28tUHZpMyV_gjoLvcym6SYtXUe&index=5&ab_channel=BillieEilish-Topic',4,4,'party favor','00:03:24',5,'party favor','2017-12-22','2020-09-10'),(14,'https://www.youtube.com/watch?v=UmpXFNTzkrc&list=PLA_EomK28tUHZpMyV_gjoLvcym6SYtXUe&index=6&ab_channel=BillieEilish-Topic',4,4,'bellyache','00:02:59',6,'bellyache','2017-12-22','2020-09-10'),(15,'https://www.youtube.com/watch?v=eCVNY3Og1ZQ&list=PLA_EomK28tUHZpMyV_gjoLvcym6SYtXUe&index=7&ab_channel=BillieEilish-Topic',4,4,'Ocean Eyes','00:03:22',7,'Ocean Eyes','2017-12-22','2020-09-10'),(16,'https://www.youtube.com/watch?v=4B7gJMPOYWk&list=PLA_EomK28tUHZpMyV_gjoLvcym6SYtXUe&index=8&ab_channel=BillieEilish-Topic',4,4,'hostage','00:03:49',8,'hostage','2017-12-22','2020-09-10'),(18,'https://www.youtube.com/watch?v=aE2zXPU7HYU&list=PLA_EomK28tUHZpMyV_gjoLvcym6SYtXUe&index=9&ab_channel=BillieEilish-Topic',4,4,'& burn','00:02:59',9,'& burn','2017-12-22','2020-09-10'),(19,'https://www.youtube.com/watch?v=osjpXngpCVU&list=OLAK5uy_ln_TpNozzkt58sUKu451JFpXVO9-IPT9w&ab_channel=DuduFaruk-Topic',5,5,'Yahasim Shel Hamin','00:02:56',1,'Yahasim Shel Hamin','2018-11-01','2020-09-10'),(20,'https://www.youtube.com/watch?v=jIOhKAGwNhQ&list=OLAK5uy_ln_TpNozzkt58sUKu451JFpXVO9-IPT9w&index=2&ab_channel=DuduFaruk',5,5,'David Hamelech','00:03:09',2,'ARAK ARAK ARAK','2018-11-01','2020-09-10'),(21,'https://www.youtube.com/watch?v=cH6spA1gHXg&list=OLAK5uy_ln_TpNozzkt58sUKu451JFpXVO9-IPT9w&index=3&ab_channel=DuduFaruk-Topic',5,5,'Yom Haravakot','00:02:34',3,'Yom Haravakot','2018-11-01','2020-09-10'),(22,'https://www.youtube.com/watch?v=rif-QI_0_C8&list=OLAK5uy_ln_TpNozzkt58sUKu451JFpXVO9-IPT9w&index=4&ab_channel=DuduFaruk',5,5,'Hagura Shhora','00:01:34',4,'Hagura Shhora','2018-11-01','2020-09-10'),(23,'https://www.youtube.com/watch?v=lPhoS6x51Y0&list=OLAK5uy_ln_TpNozzkt58sUKu451JFpXVO9-IPT9w&index=5&ab_channel=DuduFaruk-Topic',5,5,'ARMANI','00:02:04',5,'GALAVANI','2018-11-01','2020-09-10'),(24,'https://www.youtube.com/watch?v=6N-Bb6JEpy8&list=OLAK5uy_ln_TpNozzkt58sUKu451JFpXVO9-IPT9w&index=6&ab_channel=DuduFaruk-Topic',5,5,'Shlish Shlish Shlish','00:01:16',6,'Shlish Shlish Shlish','2018-11-01','2020-09-10'),(25,'https://www.youtube.com/watch?v=x-GXhamLVcQ&list=OLAK5uy_ln_TpNozzkt58sUKu451JFpXVO9-IPT9w&index=7&ab_channel=DuduFaruk',5,5,'DARABALCH','00:01:24',7,'todarabalach','2018-11-01','2020-09-10'),(26,'https://www.youtube.com/watch?v=m_zZK5ahLo4&list=PLNoktxZxujD_s20GmpaVcYHUaOJPWkzwF&ab_channel=HarryStyles-Topic',6,6,'Golden','00:03:28',1,'Golden','2019-12-12','2020-09-09'),(27,'https://www.youtube.com/watch?v=R1XewrKxroM&list=PLNoktxZxujD_s20GmpaVcYHUaOJPWkzwF&index=2&ab_channel=HarryStyles-Topic',6,6,'Watermelon Sugar','00:02:54',2,'Watermelon Sugar','2019-12-13','2020-09-10'),(28,'https://www.youtube.com/watch?v=GCHJyGYZ_8Q&list=PLNoktxZxujD_s20GmpaVcYHUaOJPWkzwF&index=3&ab_channel=HarryStyles-Topic',6,6,'Adore You','00:03:27',3,'Adore You','2019-12-13','2020-09-10'),(29,'https://www.youtube.com/watch?v=5wqtXFcUnYs&list=PLNoktxZxujD_s20GmpaVcYHUaOJPWkzwF&index=4&ab_channel=HarryStyles-Topic',6,6,'Lights Up','00:02:52',4,'Lights Up','2019-12-13','2020-09-10'),(30,'https://www.youtube.com/watch?v=VCLbEQ5WrHE&list=PLNoktxZxujD_s20GmpaVcYHUaOJPWkzwF&index=5&ab_channel=HarryStyles-Topic',6,6,'Cherry','00:04:19',5,'Cherry','2019-12-13','2020-09-10'),(44,'test',3,4,'Test','00:11:11',1,'1','2000-12-31','2020-09-16');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;

--
-- Table structure for table `songsinplaylists`
--

DROP TABLE IF EXISTS `songsinplaylists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songsinplaylists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `playlist_id` int NOT NULL,
  `song_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `playlist_id` (`playlist_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `songsinplaylists_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`),
  CONSTRAINT `songsinplaylists_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songsinplaylists`
--

/*!40000 ALTER TABLE `songsinplaylists` DISABLE KEYS */;
INSERT INTO `songsinplaylists` VALUES (1,2,10),(2,2,6),(3,2,8),(4,3,10);
/*!40000 ALTER TABLE `songsinplaylists` ENABLE KEYS */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` date DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `remember_token` tinyint(1) DEFAULT '0',
  `prefrences` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'David','david@gmail.com','2020-09-22','$2b$10$DbWcorklpRpoQIIu7wuHt.K113CnP9ToD.7KzD9kRpn2jkOxS1rF2',0,0,NULL),(3,'alon','alon@gmail.com','2020-09-22','$2b$10$dLBNRna4m1qei/QbmyqG.uFPI.VovCyilAlkWIjSQ7kGX3rTIY6CG',0,0,NULL),(5,'Amir','amird812@gmail.com','2020-09-22','$2b$10$gvtkxr5XyiJiJr8oE3eOwOTWqIAkN9k5O5HPqxKXzk5cvejwtSt.e',0,0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

--
-- Dumping events for database 'spotify_clone'
--

--
-- Dumping routines for database 'spotify_clone'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-22  0:00:22
