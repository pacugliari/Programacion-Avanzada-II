CREATE DATABASE  IF NOT EXISTS `trailerflix` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trailerflix`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: centerbeam.proxy.rlwy.net    Database: trailerflix
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `actores`
--

DROP TABLE IF EXISTS `actores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actores` (
  `idActor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idActor`)
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actores`
--

LOCK TABLES `actores` WRITE;
/*!40000 ALTER TABLE `actores` DISABLE KEYS */;
INSERT INTO `actores` VALUES (1,'Pedro Pascal'),(2,'Carl Weathers'),(3,'Misty Rosas'),(4,'Chris Bartlett'),(5,'Rio Hackford'),(6,'Giancarlo Esposito'),(7,'Tom Hopper'),(8,'David Castañeda'),(9,'Emmy Raver-Lampman'),(10,'Robert Sheehan'),(11,'Aidan Gallagher'),(12,'Elliot Page'),(13,'Anya Taylor-Joy'),(14,'Thomas Brodie-Sangster'),(15,'Harry Melling'),(16,'Moses Ingram'),(17,'Chloe Pirrie'),(18,'Janina Elkin'),(19,'Lili Reinhart'),(20,'Casey Cott'),(21,'Camila Mendes'),(22,'Marisol Nichols'),(23,'Madelaine Petsch'),(24,'Mädchen Amick'),(25,'Claire Fox'),(26,'Olivia Colman'),(27,'Matt Smith'),(28,'Tobias Menzies'),(29,'Vanesa Kirby'),(30,'Helena Bonham Carter'),(31,'Millie Bobby Brown'),(32,'Henry Cavill'),(33,'Sam Claflin'),(34,'Louis Partridge'),(35,'Adeel Akhtar'),(36,'Joaquin Phoenix'),(37,'Robert De Niro'),(38,'Zazie Beetz'),(39,'Frances Conroy'),(40,'Brett Cullen'),(41,'Shea Whigham'),(42,'Robert Downey Jr.'),(43,'Chris Evans'),(44,'Mark Ruffalo'),(45,'Chris Hemsworth'),(46,'Scarlett Johansson'),(47,'Jeremy Renner'),(48,'Emilia Clarke'),(49,'Lena Headey'),(50,'Sophie Turner'),(51,'Kit Harington'),(52,'Peter Dinklage'),(53,'Nikolaj Coster-Waldau'),(54,'Grant Gustin'),(55,'Carlos Valdes'),(56,'Danielle Panabaker'),(57,'Candice Patton'),(58,'Jesse L. Martin'),(59,'Tom Cavanagh'),(60,'Jennifer Aniston'),(61,'Courteney Cox'),(62,'Lisa Kudrow'),(63,'David Schwimmer'),(64,'Matthew Perry'),(65,'Matt LeBlanc'),(66,'Amybeth McNulty'),(67,'Geraldine James'),(68,'R. H. Thomson'),(69,'Corrine Koslo'),(70,'Dalila Bela'),(71,'Lucas Jade Zumann'),(72,'Gillian Anderson'),(73,'David Duchovny'),(74,'Mitch Pileggi'),(75,'Robert Patrick'),(76,'Tom Braidwood'),(77,'Bruce Harwood'),(78,'Jared Harris'),(79,'Stellan Skarsgård'),(80,'Emily Watson'),(81,'Paul Ritter'),(82,'Jessie Buckley'),(83,'Adam Nagaitis'),(84,'Evan Rachel Wood'),(85,'Thandie Newton'),(86,'Jeffrey Wright'),(87,'Tessa Thompson'),(88,'Ed Harris'),(89,'Luke Hemsworth'),(90,'Lee Pace'),(91,'Scoot McNairy'),(92,'Mackenzie Davis'),(93,'Kerry Bishé'),(94,'Toby Huss'),(95,'Alana Cavanaugh'),(96,'John Malkovich'),(97,'Colin Farrell'),(98,'Common'),(99,'Geena Davis'),(100,'Ioan Gruffudd'),(101,'Margot Robbie'),(102,'Ewan McGregor'),(103,'Mary Elizabeth Winstead'),(104,'Jurnee Smollett'),(105,'Rosie Perez'),(106,'Chris Messina'),(107,'Stacy Martin'),(108,'Rhona Mitra'),(109,'Theo James'),(110,'Peter Ferdinando'),(111,'Lia Williams'),(112,'Toby Jones'),(113,'Dwayne Johnson'),(114,'Kevin Hart'),(115,'Jack Black'),(116,'Karen Gillan'),(117,'Awkwafina'),(118,'Nick Jonas'),(119,'Miranda Cosgrove'),(120,'Kate Walsh'),(121,'Omar Epps'),(122,'Angus Macfadyen'),(123,'Jorja Fox'),(124,'Enver Gjokaj'),(125,'Bill Skarsgård'),(126,'Bill Hader'),(127,'James McAvoy'),(128,'Isaiah Mustafa'),(129,'Jay Ryan'),(130,'Chadwick Boseman'),(131,'Michael B. Jordan'),(132,'Lupita Nyong\'o'),(133,'Danai Gurira'),(134,'Martin Freeman'),(135,'Daniel Kaluuya'),(136,'Christian Bale'),(137,'Matt Damon'),(138,'Caitriona Balfe'),(139,'Josh Lucas'),(140,'Noah Jupe'),(141,'Jon Bernthal'),(142,'Génesis Rodríguez'),(143,'Vincent Piazza'),(144,'Benjamin Sokolow'),(145,'Emily Bayiokos'),(146,'Amy Manson'),(147,'Luke Allen-Gale'),(148,'Nina Bergman'),(149,'Dominic Mafham'),(150,'James Weber Brown'),(151,'Lorina Kamburova'),(152,'Marion Cotillard'),(153,'Laurence Fishburne'),(154,'Jude Law'),(155,'Kate Winslet'),(156,'Jennifer Ehle'),(157,'Gwyneth Paltrow'),(158,'Florence Pugh'),(159,'David Harbour'),(160,'O.T. Fagbenle'),(161,'Rachel Weisz'),(162,'William Hurt'),(163,'Ray Winstone'),(164,'Jessica Chastain'),(165,'Kristen Wiig'),(166,'Jeff Daniels'),(167,'Michael Peña'),(168,'Sean Bean'),(169,'Kate Mara'),(170,'Alicia Vikander'),(171,'Domhnall Gleeson'),(172,'Oscar Isaac'),(173,'Sonoya Mizuno'),(174,'Corey Johnson'),(175,'Claire Selby'),(176,'Gana Bayarsaikhan'),(177,'Bryce Dallas Howard'),(178,'Chris Pratt'),(179,'Irrfan Khan'),(180,'Vincent D\'Onofrio'),(181,'Omar Sy'),(182,'Nick Robinson'),(183,'Judy Greer'),(184,'Will Smith'),(185,'Alice Braga'),(186,'Charlie Tahan'),(187,'Dash Mihok'),(188,'Salli Richardson-Whitfield'),(189,'Willow Smith'),(190,'Emma Thompson'),(191,'Ryan Gosling'),(192,'Claire Foy'),(193,'Jason Clarke'),(194,'Kyle Chandler'),(195,'Corey Stoll'),(196,'Patrick Fugit'),(197,'John Boyega'),(198,'Scott Eastwood'),(199,'Cailee Spaeny'),(200,'Jing Tian'),(201,'Rinko Kikuchi'),(202,'Burn Gorman'),(203,'Jim Parsons'),(204,'Johnny Galecki'),(205,'Kaley Cuoco'),(206,'Simon Helberg'),(207,'Kunal Nayyar'),(208,'Melissa Rauch'),(209,'Mayim Bialik');
/*!40000 ALTER TABLE `actores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `catalogo`
--

DROP TABLE IF EXISTS `catalogo`;
/*!50001 DROP VIEW IF EXISTS `catalogo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `catalogo` AS SELECT 
 1 AS `id`,
 1 AS `poster`,
 1 AS `poster_id`,
 1 AS `titulo`,
 1 AS `blocked`,
 1 AS `categoria`,
 1 AS `resumen`,
 1 AS `temporadas`,
 1 AS `generos`,
 1 AS `reparto`,
 1 AS `trailer`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `idCategoria` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Serie'),(2,'Película');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `idGenero` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idGenero`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Ciencia Ficción'),(2,'Fantasía'),(3,'Drama'),(4,'Ficción'),(5,'Sucesos'),(6,'Misterio'),(7,'Hechos verídicos'),(8,'Crimen'),(9,'Suspenso'),(10,'Aventura'),(11,'Sci-Fi'),(12,'Acción'),(13,'Comedia'),(14,'Familia'),(15,'Western'),(16,'Tecnología'),(17,'Terror'),(18,'Historia'),(19,'Intriga'),(20,'Ciencia Ficción'),(21,'Fantasía'),(22,'Drama'),(23,'Ficción'),(24,'Sucesos'),(25,'Misterio'),(26,'Hechos verídicos'),(27,'Crimen'),(28,'Suspenso'),(29,'Aventura'),(30,'Sci-Fi'),(31,'Acción'),(32,'Comedia'),(33,'Familia'),(34,'Western'),(35,'Tecnología'),(36,'Terror'),(37,'Historia'),(38,'Intriga');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculas`
--

DROP TABLE IF EXISTS `peliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peliculas` (
  `idPelicula` int NOT NULL AUTO_INCREMENT,
  `poster` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `poster_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `titulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `idCategoria` int NOT NULL,
  `resumen` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cantidadTemporadas` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'N/A',
  `blocked` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idPelicula`),
  KEY `Peliculas_fk0` (`idCategoria`),
  CONSTRAINT `Peliculas_fk0` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculas`
--

LOCK TABLES `peliculas` WRITE;
/*!40000 ALTER TABLE `peliculas` DISABLE KEYS */;
INSERT INTO `peliculas` VALUES (1,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286707/1_n1gtfs.jpg','1_n1gtfs','The Crown',1,'Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX.','4',1),(2,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286707/2_zv5j7p.jpg','2_zv5j7p','Riverdale',1,'El paso a la edad adulta incluye sexo, romance, escuela y familia. Para Archie y sus amigos, también hay misterios oscuros.','5',1),(3,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286708/3_w2qvlw.jpg','3_w2qvlw','The Mandalorian',1,'Ambientada tras la caída del Imperio y antes de la aparición de la Primera Orden, la serie sigue los pasos de un pistolero solitario en las aventuras que protagoniza en los confines de la galaxia, donde no alcanza la autoridad de la Nueva República.','2',1),(4,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286708/4_ehgonl.jpg','4_ehgonl','The Umbrella Academy',1,'La muerte de su padre reúne a unos hermanos distanciados y con extraordinarios poderes que descubren impactantes secretos y una amenaza que se cierne sobre la humanidad.','1',1),(5,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286709/5_lthag6.jpg','5_lthag6','Gambito de Dama',1,'En los cincuenta, una joven de un orfanato descubre que tiene un increíble don para el ajedrez y recorre el arduo camino a la fama mientras lucha contra las adicciones.','1',1),(6,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286710/6_uwjok9.jpg','6_uwjok9','Enola Holmes',2,'La hermana menor de Sherlock, descubre que su madre ha desaparecido y se dispone a encontrarla. En su búsqueda, saca a relucir el sabueso que corre por sus venas y se encuentra con una conspiración que gira en torno a un misterioso lord, demostrando que su ilustre hermano no es el único talento en la familia.','N/A',1),(7,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286710/7_bktk9v.jpg','7_bktk9v','Guasón',2,'Arthur Fleck (Phoenix) es un hombre ignorado por la sociedad, cuya motivación en la vida es hacer reír. Pero una serie de trágicos acontecimientos le llevarán a ver el mundo de otra forma. Película basada en el popular personaje de DC Comics Joker, conocido como archivillano de Batman, pero que en este film tomará un cariz más realista y oscuro.','N/A',1),(8,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286711/8_vsgmbs.jpg','8_vsgmbs','Avengers: End Game',2,'Después de los devastadores eventos de los Vengadores: Infinity War (2018), el universo está en ruinas. Con la ayuda de los aliados restantes, los Vengadores se reúnen una vez más para revertir las acciones de Thanos y restaurar el equilibrio del universo.','N/A',1),(9,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286711/9_nyvvjf.jpg','9_nyvvjf','Juego de tronos',1,'En un mundo fantástico y en un contexto medieval varias familias, relativas a la nobleza, se disputan el poder para dominar el territorio ficticio de Poniente (Westeros) y tomar el control de los Siete Reinos desde el Trono de Hierro, lugar donde el rey ejerce el poder.','8',1),(10,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286712/10_neyol5.jpg','10_neyol5','The Flash',1,'Sigue las veloces aventuras de Barry Allen, un joven común y corriente con el deseo latente de ayudar a los demás. Cuando una inesperada partícula aceleradora golpea por accidente a Barry, de pronto se encuentra cargado de un increíble poder para moverse a increíbles velocidades. Mientras Barry siempre ha tenido el alma de un héroe, sus nuevos poderes le han dado la capacidad de actuar como tal.','6',1),(11,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286713/11_iyxipx.jpg','11_iyxipx','The Big Bang Theory',1,'Leonard y Sheldon son dos físicos que comparten trabajo y apartamento. La serie comienza con la mudanza de Penny, su nueva y atractiva vecina, y hace hincapié en la dificultad de los físicos para relacionarse con personas fuera de su entorno para dar lugar a situaciones cómicas.','12',1),(12,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286714/12_hfmlo9.jpg','12_hfmlo9','Friends',1,'\'Friends\' narra las aventuras y desventuras de seis jóvenes de Nueva York: Rachel, Monica, Phoebe, Ross, Chandler y Joey. Ellos forman una unida pandilla de amigos que viven en Manhattan y que suelen reunirse en sus apartamentos o en su bar habitual cafetería, el Central Perk. A pesar de los numerosos cambios que se producen en sus vidas, su amistad es inquebrantable en la dura batalla por salir adelante en sus periplos profesionales y personales.','10',1),(13,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286715/13_x7vxl2.jpg','13_x7vxl2','Anne with an \'E\'',1,'Anne Shirley es una niña huérfana que vive en un pequeño pueblo llamado Avonlea que pertenece a la Isla del Príncipe Eduardo, en el año 1890. Después de una infancia difícil, donde fue pasando de orfanato a hogares de acogida, es enviada por error a vivir con una solterona y su hermano. Cuando cumple 13 años, Anne va a conseguir transformar su vida y el pequeño pueblo donde vive gracias a su fuerte personalidad, intelecto e imaginación. Basada en la inolvidable novela.','2',1),(14,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286715/14_d4ya4o.jpg','14_d4ya4o','Expedientes Secretos \'X\'',1,'Fox Mulder y Dana Scully son dos investigadores del FBI que investigan casos sin resolución ni explicación, ya sea por razones paranormales (espíritus, criaturas extrañas, aliens...) ya porque el gobierno se ha encargado de ocultar todo tipo de pruebas. Cuando Mulder tenía doce años, su hermana pequeña fue secuestrada por unos desconocidos, aunque él cree que, en realidad, fue abducida por extraterrestres. Tras acabar sus estudios en la universidad de Oxford, ingresó en la Academia de Quantico, donde se ganó el apodo de \'siniestro\'','11',1),(15,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286715/15_khubfy.jpg','15_khubfy','Chernobyl',1,'Sigue «la verdadera historia de una de las peores catástrofes provocadas por el hombre y habla de los valientes hombres y mujeres que se sacrificaron para salvar a Europa de un desastre inimaginable. La miniserie se centra en el desgarrador alcance del desastre de la planta nuclear que ocurrió en Ucrania en abril de 1986, revelando cómo y por qué ocurrió, además contando las sorprendentes y notables historias de los héroes que lucharon y cayeron.','1',1),(16,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286716/16_w358vi.jpg','16_w358vi','Westworld',1,'\'Westworld\' es una oscura odisea acerca del amanecer de la conciencia artificial y la evolución del pecado. Situada en la intersección del futuro cercano y el pasado reimaginado, explora un mundo donde cada apetito humano, sin importar cuán noble o depravado, puede ser saciado. Está ambientada en un parque temático futurista dirigido por el Dr. Robert Ford (Anthony Hopkins). Las instalaciones cuentan con androides caracterizados del western americano, y gracias a ellos los visitantes pueden introducirse en cualquier tipo de fantasía por muy oscura que sea.','3',1),(17,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286717/17_e67xwn.jpg','17_e67xwn','Halt and Catch Fire',1,'Situada en los inicios de la década de 1980, un visionario ficticio, un ingeniero electrónico y una prodigiosa ingeniera, se alían a una programadora de software para confrontar con las corporaciones informáticas dominantes de la época. El Personal de la firma y sus socios de negocio, comenzarán una carrera que cambiará la cultura en el Estado de Texas, cuna de las empresas de tecnología, casi de la misma forma que lo es hoy Silicon Valey. \n Esta historia ficticia emula el trabajo realizado, en su momento, por la firma Compaq, cuando clonó el BIOS de las Computadoras Personales IBM, dando vida así al económico mercado de los clones. Mostrando también, a lo largo de sus 4 temporadas, el nacimiento de la arquitectura abierta de hardware, los videojuegos online, las salas de chat y de trueque de productos físicos, los BBS, y las primeras nubes computacionales, hasta la llegada de Internet (sin dejar afuera la guerra de los web browsers).','4',1),(18,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286718/18_fta75x.jpg','18_fta75x','Ava',2,'Ava es una mortífera asesina a sueldo que trabaja para una organización de operaciones encubiertas, que viaja por todo el mundo acabando con aquellos objetivos que nadie más puede derribar. Cuando uno de sus encargos sale mal, Ava tendrá que luchar por una vida.','N/A',1),(19,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286719/19_wiq6vr.jpg','19_wiq6vr','Aves de presa y la fantabulosa emancipación de una Harley Quinn',2,'Después de separarse de Joker, Harley Quinn y otras tres heroínas (Canario Negro, Cazadora y Renée Montoya) unen sus fuerzas para salvar a una niña (Cassandra Cain) del malvado rey del crimen Máscara Negra.','N/A',1),(20,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286720/20_hqxrbj.jpg','20_hqxrbj','Archivo',2,'2038: George Almore está trabajando en una verdadera IA equivalente a la humana. Su último prototipo está casi listo. Esta fase sensible también es la más arriesgada. Especialmente porque tiene un objetivo que debe ocultarse a toda costa: reunirse con su esposa muerta.','N/A',1),(21,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286721/21_t9dinr.jpg','21_t9dinr','Jumanji - The next level',2,'Las aventuras continúan en el fantástico mundo del video juego Jumanji, donde nada es lo que parece. En esta ocasión, los jugadores vuelven al juego, pero sus personajes se han intercambiado entre sí, lo que ofrece un curioso plantel: los mismos héroes con distinta apariencia y habilidades. Pero, ¿dónde está el resto de la gente?','N/A',1),(22,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286722/22_m9qtem.jpg','23_uf4pwc','3022',2,'La película está ambientada en una estación espacial en el futuro. La tripulación sufre un estrés traumático y considera abandonar su misión después de observar lo que creen que es la destrucción de la Tierra. La película se muestra como una serie de flashbacks y flash-forward.','N/A',1),(23,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286722/23_uf4pwc.jpg','23_uf4pwc','IT - Capítulo 2',2,'En este segundo capitulo Han pasado 27 años desde que el \'Club de los Perdedores\', formado por Bill, Berverly, Richie, Ben, Eddie, Mike y Stanley, se enfrentaran al macabro y despiadado Pennywise (Bill Skarsgård). En cuanto tuvieron oportunidad, abandonaron el pueblo de Derry, en el estado de Maine, que tantos problemas les había ocasionado. Sin embargo, ahora, siendo adultos, parece que no pueden escapar de su pasado. Todos deberán enfrentarse de nuevo al temible payaso para descubrir si de verdad están preparados para superar sus traumas de la infancia.','N/A',1),(24,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286724/24_jhsafz.jpg','24_jhsafz','Pantera Negra',2,'T’Challa (Chadwick Boseman) regresa a su hogar en la apartada nación africana de Wakanda para servir como líder de su país. Tras suceder a su padre en el trono, pasa a convertirse en Pantera Negra, una sigilosa criatura de la noche, con agudos sentidos felinos y otras habilidades como súper fuerza e inteligencia, agilidad, estrategia o maestro del combate sin armas. Es bajo el liderazgo de T’Challa como Wakanda consigue convertirse en una de las naciones más ricas y tecnológicamente avanzadas del planeta.','N/A',1),(25,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286724/25_r4u1ks.jpg','25_r4u1ks','Contra lo imposible (Ford versus Ferrari)',2,'Los ganadores del Premio de la Academia® Matt Damon y Christian Bale protagonizan CONTRA LO IMPOSIBLE, basada en la historia real del visionario diseñador americano de automóviles Carroll Shelby (Damon) y el intrépido piloto británico Ken Miles (Bale). Juntos construyen un nuevo coche de carreras para Ford Motor Company y así enfrentar a Enzo Ferrari en las 24 Horas de Le Mans en Francia en 1966.','N/A',1),(26,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286725/26_tnp1uw.jpg','26_tnp1uw','Centígrados',2,'Una joven pareja estadounidense viaja a las montañas árticas de Noruega. Después de detenerse durante una tormenta de nieve, se despiertan atrapados en su SUV, enterrados bajo capas de nieve y hielo.','N/A',1),(27,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286726/27_r61it1.jpg','27_r61it1','DOOM: Aniquilación',2,'Doom: Aniquilación sigue a un grupo de marines espaciales que han respondido a una llamada de alerta de una base en la luna marciana, solo para descubrir que ha sido tomada por criaturas demoníacas que amenazan con desatar el infierno en la tierra.','N/A',1),(28,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286727/28_l3nwax.jpg','28_l3nwax','Contagio',2,'De repente, sin saber cuál es su origen, aunque todo hace sospechar que comienza con el viaje de una norteamericana a un casino de Hong Kong, un virus mortal comienza a propagarse por todo el mundo. En pocos días, la enfermedad empieza a diezmar a la población. El contagio se produce por mero contacto entre los seres humanos. Un thriller realista y sin efectos especiales sobre los efectos de una epidemia.','N/A',1),(29,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286728/29_hqlepd.jpg','29_hqlepd','Viuda Negra',2,'Primera pelicula individual de la Viuda Negra en el universo cinematografico de Marvel, contando su historia desde que se inició como doble agente rusa, su niñez, sus misiones, y su actualidad, después de Avengers.','N/A',1),(30,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286729/30_tvyroj.jpg','30_tvyroj','The Martian',2,'Durante una misión a Marte de la nave tripulada Ares III, una fuerte tormenta se desata dando por desaparecido y muerto al astronauta Mark Watney (Matt Damon), sus compañeros toman la decisión de irse pero él ha sobrevivido. Está solo y sin apenas recursos en el planeta. Con muy pocos medios deberá recurrir a sus conocimientos, su sentido del humor y un gran instinto de supervivencia para lograr sobrevivir y comunicar a la Tierra que todavía está vivo esperando que acudan en su rescate.','N/A',1),(31,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286731/31_jqkmyr.jpg','31_jqkmyr','Ex-Machina',2,'Un programador multimillonario selecciona a Caleb, un joven empleado de su empresa, para que pase una semana en un lugar remoto con el objetivo de que participe en un test en el que estará involucrada su última creación: un robot-mujer en el que inteligencia artificial lo es todo.','N/A',1),(32,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286731/32_vlhoqi.jpg','32_vlhoqi','Jurassic World',2,'Veintidós años después de lo ocurrido en Jurassic Park, la isla Nublar ha sido transformada en un enorme parque temático, Jurassic Wold, con versiones «domesticadas» de algunos de los dinosaurios más conocidos. Cuando todo parece ir sobre ruedas y ser el negocio del siglo, un nuevo dinosaurio de especie desconocida, pues ha sido creado manipulando genéticamente su ADN, y que resulta ser mucho más inteligente de lo que se pensaba, se escapa de su recinto y comienza a causar estragos entre los visitantes del Parque.','N/A',1),(33,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286732/33_zsb9wp.jpg','33_zsb9wp','Soy leyenda',2,'Años después de que una plaga mate a la mayoría de la humanidad y transforme al resto en monstruos, el único superviviente en la ciudad de Nueva York lucha valientemente para encontrar una cura.','N/A',1),(34,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286733/34_yaratu.jpg','34_yaratu','El primer hombre en la luna',2,'Cuenta la historia de la misión de la NASA que llevó al primer hombre a la luna, centrada en Neil Armstrong (interpretado por Ryan Gosling) y el periodo comprendido entre los años 1961 y 1969. Un relato en primera persona, basado en la novela de James R. Hansen, que explora el sacrificio y el precio que representó, tanto para Armstrong como para Estados Unidos, una de las misiones más peligrosas de la historia.','N/A',1),(35,'https://res.cloudinary.com/doypmjt76/image/upload/v1748286734/35_oxxf6a.jpg','35_oxxf6a','Titanes del pacífico - La insurrección',2,'Han pasado 10 años tras la primera invasión que sufrió la humanidad, pero la lucha aún no ha terminado. El planeta vuelve a ser asediado por los Kaiju, una raza de alienígenas colosales, que emergen desde un portal interdimensional con el objetivo de destruir a la raza humana. Ante esta nueva amenaza, los Jaegers, robots gigantes de guerra pilotados por dos personas para sobrellevar la inmensa carga neuronal que conlleva manipularlos, ya no están a la altura de lo que se les viene encima. Será entonces cuando los supervivientes de la primera invasión, además de nuevos personajes como el hijo de Pentecost, tendrán que idear la manera de sorprender al enorme enemigo, apostando por nuevas estrategias defensivas y de ataque. Con la Tierra en ruinas e intentando reconstruirse, esta nueva batalla puede ser decisiva para el futuro.','N/A',1);
/*!40000 ALTER TABLE `peliculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculasgeneros`
--

DROP TABLE IF EXISTS `peliculasgeneros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peliculasgeneros` (
  `idPeliculaGenero` int NOT NULL AUTO_INCREMENT,
  `idPelicula` int NOT NULL,
  `idGenero` int NOT NULL,
  PRIMARY KEY (`idPeliculaGenero`),
  KEY `PeliculasGeneros_fk0` (`idPelicula`),
  KEY `PeliculasGeneros_fk1` (`idGenero`),
  CONSTRAINT `PeliculasGeneros_fk0` FOREIGN KEY (`idPelicula`) REFERENCES `peliculas` (`idPelicula`),
  CONSTRAINT `PeliculasGeneros_fk1` FOREIGN KEY (`idGenero`) REFERENCES `generos` (`idGenero`)
) ENGINE=InnoDB AUTO_INCREMENT=312 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculasgeneros`
--

LOCK TABLES `peliculasgeneros` WRITE;
/*!40000 ALTER TABLE `peliculasgeneros` DISABLE KEYS */;
INSERT INTO `peliculasgeneros` VALUES (5,5,3),(6,5,4),(7,5,5),(8,2,3),(9,2,4),(10,2,6),(13,6,4),(14,6,3),(15,6,6),(22,9,10),(23,9,2),(24,9,3),(25,10,2),(26,10,1),(27,11,13),(28,11,2),(29,11,4),(30,12,13),(31,12,14),(32,12,3),(33,13,3),(34,13,14),(35,13,15),(36,14,3),(37,14,1),(40,16,15),(41,16,1),(42,17,4),(43,17,3),(44,17,16),(45,18,12),(46,18,3),(47,18,9),(48,19,12),(49,19,4),(50,19,13),(51,20,12),(52,20,11),(53,20,9),(54,21,13),(55,21,4),(56,21,10),(57,22,1),(58,22,9),(59,23,17),(60,23,9),(61,23,2),(62,24,12),(63,24,10),(64,24,2),(65,25,3),(66,25,18),(67,25,10),(68,26,3),(69,26,9),(70,26,19),(71,27,12),(72,27,11),(73,27,17),(74,28,3),(75,28,9),(76,28,4),(77,29,3),(78,29,12),(79,29,10),(80,30,3),(81,30,11),(82,30,10),(83,31,3),(84,31,11),(85,31,9),(86,32,9),(87,32,10),(88,32,4),(89,33,3),(90,33,17),(91,33,4),(92,34,3),(93,34,7),(94,35,12),(95,35,2),(96,35,11),(170,7,3),(171,7,8),(172,7,9),(178,8,10),(179,8,11),(180,8,12),(241,4,1),(242,4,2),(280,3,1),(281,3,2),(287,15,3),(288,15,7),(304,1,3),(305,1,7);
/*!40000 ALTER TABLE `peliculasgeneros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculasrepartos`
--

DROP TABLE IF EXISTS `peliculasrepartos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peliculasrepartos` (
  `idPeliculaReparto` int NOT NULL AUTO_INCREMENT,
  `idPelicula` int NOT NULL,
  `idActor` int NOT NULL,
  PRIMARY KEY (`idPeliculaReparto`),
  KEY `PeliculasRepartos_fk0` (`idPelicula`),
  KEY `PeliculasRepartos_fk1` (`idActor`),
  CONSTRAINT `PeliculasRepartos_fk0` FOREIGN KEY (`idPelicula`) REFERENCES `peliculas` (`idPelicula`),
  CONSTRAINT `PeliculasRepartos_fk1` FOREIGN KEY (`idActor`) REFERENCES `actores` (`idActor`)
) ENGINE=InnoDB AUTO_INCREMENT=644 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculasrepartos`
--

LOCK TABLES `peliculasrepartos` WRITE;
/*!40000 ALTER TABLE `peliculasrepartos` DISABLE KEYS */;
INSERT INTO `peliculasrepartos` VALUES (15,5,13),(16,5,14),(17,5,15),(18,5,16),(19,5,17),(20,5,18),(22,2,19),(23,2,20),(24,2,21),(25,2,22),(26,2,23),(27,2,24),(36,6,30),(37,6,31),(38,6,32),(39,6,33),(40,6,34),(41,6,35),(57,9,48),(58,9,49),(59,9,50),(60,9,51),(61,9,52),(62,9,53),(64,10,54),(65,10,55),(66,10,56),(67,10,57),(68,10,58),(69,10,59),(71,12,60),(72,12,61),(73,12,62),(74,12,63),(75,12,64),(76,12,65),(78,11,203),(79,11,204),(80,11,205),(81,11,206),(82,11,207),(83,11,208),(84,11,209),(85,13,66),(86,13,67),(87,13,68),(88,13,69),(89,13,71),(92,14,72),(93,14,73),(94,14,74),(95,14,75),(96,14,76),(97,14,77),(106,16,84),(107,16,85),(108,16,86),(109,16,87),(110,16,88),(111,16,89),(113,17,90),(114,17,91),(115,17,92),(116,17,93),(117,17,94),(118,17,95),(120,13,70),(121,18,96),(122,18,97),(123,18,98),(124,18,99),(125,18,100),(126,18,164),(128,19,101),(129,19,102),(130,19,103),(131,19,104),(132,19,105),(133,19,106),(135,20,107),(136,20,108),(137,20,109),(138,20,110),(139,20,111),(140,20,112),(142,21,113),(143,21,114),(144,21,115),(145,21,116),(146,21,117),(147,21,118),(149,22,119),(150,22,120),(151,22,121),(152,22,122),(153,22,123),(154,22,124),(156,23,125),(157,23,126),(158,23,127),(159,23,128),(160,23,129),(161,23,164),(163,24,130),(164,24,131),(165,24,132),(166,24,133),(167,24,134),(168,24,135),(170,25,136),(171,25,137),(172,25,138),(173,25,139),(174,25,140),(175,25,141),(177,26,142),(178,26,143),(179,26,144),(180,26,145),(184,27,146),(185,27,147),(186,27,148),(187,27,149),(188,27,150),(189,27,151),(191,28,137),(192,28,152),(193,28,153),(194,28,154),(195,28,155),(196,28,156),(197,28,157),(198,29,46),(199,29,158),(200,29,159),(201,29,160),(202,29,161),(203,29,162),(204,29,163),(205,30,137),(206,30,164),(207,30,165),(208,30,166),(209,30,167),(210,30,168),(211,30,169),(212,31,170),(213,31,171),(214,31,172),(215,31,173),(216,31,174),(217,31,175),(218,31,176),(219,32,177),(220,32,178),(221,32,179),(222,32,180),(223,32,181),(224,32,182),(225,32,183),(226,33,184),(227,33,185),(228,33,186),(229,33,187),(230,33,188),(231,33,189),(232,33,190),(233,34,191),(234,34,192),(235,34,193),(236,34,194),(237,34,195),(238,34,196),(240,35,197),(241,35,198),(242,35,199),(243,35,200),(244,35,201),(245,35,202),(374,7,36),(375,7,37),(376,7,38),(377,7,39),(378,7,40),(379,7,41),(392,8,42),(393,8,43),(394,8,44),(395,8,45),(396,8,46),(397,8,47),(494,4,7),(495,4,8),(496,4,9),(497,4,10),(498,4,11),(499,4,12),(583,3,1),(584,3,2),(585,3,3),(586,3,4),(587,3,5),(588,3,6),(594,15,78),(595,15,79),(596,15,80),(597,15,81),(598,15,82),(599,15,83),(628,1,25),(629,1,26),(630,1,27),(631,1,28),(632,1,29),(633,1,30);
/*!40000 ALTER TABLE `peliculasrepartos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculastrailers`
--

DROP TABLE IF EXISTS `peliculastrailers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peliculastrailers` (
  `idPeliculaTrailer` int NOT NULL AUTO_INCREMENT,
  `idPelicula` int NOT NULL,
  `trailer` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idPeliculaTrailer`),
  KEY `PeliculasTrailers_fk0` (`idPelicula`),
  CONSTRAINT `PeliculasTrailers_fk0` FOREIGN KEY (`idPelicula`) REFERENCES `peliculas` (`idPelicula`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculastrailers`
--

LOCK TABLES `peliculastrailers` WRITE;
/*!40000 ALTER TABLE `peliculastrailers` DISABLE KEYS */;
INSERT INTO `peliculastrailers` VALUES (3,11,'https://www.youtube.com/embed/WBb3fojgW0Q'),(4,14,'https://www.youtube.com/embed/KKziOmsJxzE'),(6,16,'https://www.youtube.com/embed/qLFBcdd6Qw0'),(7,17,'https://www.youtube.com/embed/pWrioRji60A'),(8,20,'https://www.youtube.com/embed/VHSoCnDioAo'),(9,21,'https://www.youtube.com/embed/rBxcF-r9Ibs'),(10,22,'https://www.youtube.com/embed/AGQ7OkmIx4Q'),(11,23,'https://www.youtube.com/embed/hZeFeYSmBcg'),(12,24,'https://www.youtube.com/embed/BE6inv8Xh4A'),(13,25,'https://www.youtube.com/embed/SOVb0-2g1Q0'),(14,27,'https://www.youtube.com/embed/nat3u3gAVLE'),(15,28,'https://www.youtube.com/embed/4sYSyuuLk5g'),(16,29,'https://www.youtube.com/embed/BIn8iANwEog'),(17,30,'https://www.youtube.com/embed/XvB58bCVfng'),(18,31,'https://www.youtube.com/embed/XRYL5spvEcI'),(19,33,'https://www.youtube.com/embed/dtKMEAXyPkg'),(54,7,'https://www.youtube.com/embed/zAGVQLHvwOY'),(57,8,'N/A'),(93,4,'N/A'),(114,3,'https://www.youtube.com/embed/aOC8E8z_ifw'),(118,15,'https://www.youtube.com/embed/s9APLXM9Ei8'),(126,1,'N/A');
/*!40000 ALTER TABLE `peliculastrailers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `catalogo`
--

/*!50001 DROP VIEW IF EXISTS `catalogo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `catalogo` AS select `pel`.`idPelicula` AS `id`,`pel`.`poster` AS `poster`,`pel`.`poster_id` AS `poster_id`,`pel`.`titulo` AS `titulo`,`pel`.`blocked` AS `blocked`,concat('[',group_concat(distinct json_object('id',`cat`.`idCategoria`,'descripcion',`cat`.`descripcion`) separator ','),']') AS `categoria`,`pel`.`resumen` AS `resumen`,`pel`.`cantidadTemporadas` AS `temporadas`,concat('[',group_concat(distinct json_object('id',`gen`.`idGenero`,'descripcion',`gen`.`descripcion`) separator ','),']') AS `generos`,concat('[',group_concat(distinct json_object('id',`act`.`idActor`,'nombre',`act`.`nombre`) separator ','),']') AS `reparto`,group_concat(distinct ifnull(`pelt`.`trailer`,'N/A') separator ',') AS `trailer` from ((((((`peliculas` `pel` left join `categorias` `cat` on((`cat`.`idCategoria` = `pel`.`idCategoria`))) left join `peliculasgeneros` `pelg` on((`pelg`.`idPelicula` = `pel`.`idPelicula`))) left join `generos` `gen` on((`gen`.`idGenero` = `pelg`.`idGenero`))) left join `peliculasrepartos` `pelr` on((`pelr`.`idPelicula` = `pel`.`idPelicula`))) left join `actores` `act` on((`act`.`idActor` = `pelr`.`idActor`))) left join `peliculastrailers` `pelt` on((`pelt`.`idPelicula` = `pel`.`idPelicula`))) group by `pel`.`idPelicula` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-02 20:36:02
