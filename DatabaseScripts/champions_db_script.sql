DROP SCHEMA IF EXISTS `champions_db`;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema champions_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema champions_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `champions_db` DEFAULT CHARACTER SET utf8 ;
USE `champions_db` ;

-- -----------------------------------------------------
-- Table `champions_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `champions_db`.`users` (
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `is_admin` TINYINT(1) NOT NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `champions_db`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `champions_db`.`articles` (
  `article_id` INT NOT NULL AUTO_INCREMENT,
  `users_username` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `snippet` VARCHAR(240) NOT NULL,
  `article_intro` VARCHAR(2400) NOT NULL,
  `article_content` VARCHAR(2400) NOT NULL,
  `article_conclusion` VARCHAR(2400) NOT NULL,
  INDEX `fk_articles_users1_idx` (`users_username` ASC) VISIBLE,
  PRIMARY KEY (`article_id`),
  CONSTRAINT `fk_articles_users1`
    FOREIGN KEY (`users_username`)
    REFERENCES `champions_db`.`users` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `champions_db`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `champions_db`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `article_id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  `comment` VARCHAR(120) NOT NULL,
  INDEX `fk_comments_articles1_idx` (`article_id` ASC) VISIBLE,
  INDEX `fk_comments_users1_idx` (`username` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comments_articles1`
    FOREIGN KEY (`article_id`)
    REFERENCES `champions_db`.`articles` (`article_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_users1`
    FOREIGN KEY (`username`)
    REFERENCES `champions_db`.`users` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- -----------------------------------------------------
-- Insert data to use in the `accountDB`
-- -----------------------------------------------------

INSERT INTO users (username, password, is_admin) VALUES
('peter', 'pass', 1),
('ojvind', '1234', 1),
('bill', '1234', 0),
('bob', '1234', 0);

INSERT INTO articles (users_username, date, title, snippet, article_intro, article_content, article_conclusion) VALUES
('peter', '2020-9-09', 'Flappy Bird', 'A simple ardiuno project we worked on.', 'Article intro!', 'The arduino game was made on a small screen which was played using a joystick where the goal was to survive through 10 levels where the player needs to dodge obsticles.', 'Article conclusion!'),
('ojvind', '2021-1-06', 'Pokemon', 'First game group project using java.', 'Article intro!', 'Article content!', 'Article conclusion!'),
('peter', '2021-3-01', 'Dungeon Delver', 'A turned based combat game made for android.', 'Article intro!', 'Article content!', 'Article conclusion!');

INSERT INTO comments (article_id, username, date, comment) VALUES
(1, 'peter', '2020-9-10', 'This is a simple test comment.'),
(1, 'bob', '2020-11-11', 'Hello! Im Bob!'),
(1, 'bill', '2021-1-02', 'Nice Project!'),
(1, 'ojvind', '2021-2-11', 'I made diss.'),
(2, 'peter', '2021-1-10', 'Anyone want to comment?'),
(2, 'bob', '2021-1-11', 'Hello! Im Bob!'),
(3, 'bill', '2021-3-03', 'How was this to make?'),
(3, 'ojvind', '2021-3-05', 'It was a hassle, but keeping some concepts simple made it fun.');
