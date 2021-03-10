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
  `article` VARCHAR(2400) NOT NULL,
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
  `article_id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  `comment` VARCHAR(120) NOT NULL,
  INDEX `fk_comments_articles1_idx` (`article_id` ASC) VISIBLE,
  INDEX `fk_comments_users1_idx` (`username` ASC) VISIBLE,
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

INSERT INTO articles (users_username, date, title, snippet, article) VALUES
('peter', '2021-3-10', 'Flappy Bird', 'A simple ardiuno project we worked on.', 'The arduino game was made on a small screen which was played using a joystick where the goal was to survive through 10 levels where the player needs to dodge obsticles.');

INSERT INTO comments (article_id, username, date, comment) VALUES
(1, 'peter', '2021-3-10', 'This is a simple test comment.');
