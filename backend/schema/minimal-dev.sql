CREATE DATABASE IF NOT EXISTS kamanote_tech
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE kamanote_tech;

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` BIGINT NOT NULL AUTO_INCREMENT,
  `account` VARCHAR(64) NOT NULL,
  `username` VARCHAR(64) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `gender` INT DEFAULT 3,
  `birthday` DATE DEFAULT NULL,
  `avatar_url` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `school` VARCHAR(255) DEFAULT NULL,
  `signature` VARCHAR(255) DEFAULT NULL,
  `is_banned` INT NOT NULL DEFAULT 0,
  `is_admin` INT NOT NULL DEFAULT 0,
  `last_login_at` DATETIME DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uk_user_account` (`account`),
  UNIQUE KEY `uk_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NOT NULL,
  `parent_category_id` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `question` (
  `question_id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT DEFAULT NULL,
  `title` VARCHAR(255) NOT NULL,
  `difficulty` INT NOT NULL DEFAULT 1,
  `exam_point` VARCHAR(255) DEFAULT NULL,
  `view_count` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`question_id`),
  KEY `idx_question_category_id` (`category_id`),
  CONSTRAINT `fk_question_category`
    FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `note` (
  `note_id` INT NOT NULL AUTO_INCREMENT,
  `author_id` BIGINT NOT NULL,
  `question_id` INT DEFAULT NULL,
  `content` MEDIUMTEXT NOT NULL,
  `like_count` INT NOT NULL DEFAULT 0,
  `comment_count` INT NOT NULL DEFAULT 0,
  `collect_count` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`note_id`),
  KEY `idx_note_author_id` (`author_id`),
  KEY `idx_note_question_id` (`question_id`),
  CONSTRAINT `fk_note_author`
    FOREIGN KEY (`author_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_note_question`
    FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `collection` (
  `collection_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `creator_id` BIGINT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`collection_id`),
  KEY `idx_collection_creator_id` (`creator_id`),
  CONSTRAINT `fk_collection_creator`
    FOREIGN KEY (`creator_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `collection_note` (
  `collection_id` INT NOT NULL,
  `note_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`collection_id`, `note_id`),
  KEY `idx_collection_note_note_id` (`note_id`),
  CONSTRAINT `fk_collection_note_collection`
    FOREIGN KEY (`collection_id`) REFERENCES `collection` (`collection_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_collection_note_note`
    FOREIGN KEY (`note_id`) REFERENCES `note` (`note_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `note_like` (
  `note_id` INT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`note_id`, `user_id`),
  KEY `idx_note_like_user_id` (`user_id`),
  CONSTRAINT `fk_note_like_note`
    FOREIGN KEY (`note_id`) REFERENCES `note` (`note_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_note_like_user`
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `note_collect` (
  `collect_id` INT NOT NULL AUTO_INCREMENT,
  `note_id` INT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`collect_id`),
  UNIQUE KEY `uk_note_collect_note_user` (`note_id`, `user_id`),
  KEY `idx_note_collect_user_id` (`user_id`),
  CONSTRAINT `fk_note_collect_note`
    FOREIGN KEY (`note_id`) REFERENCES `note` (`note_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_note_collect_user`
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `note_id` INT NOT NULL,
  `author_id` BIGINT NOT NULL,
  `parent_id` INT DEFAULT NULL,
  `content` TEXT NOT NULL,
  `like_count` INT NOT NULL DEFAULT 0,
  `reply_count` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `idx_comment_note_id` (`note_id`),
  KEY `idx_comment_author_id` (`author_id`),
  KEY `idx_comment_parent_id` (`parent_id`),
  CONSTRAINT `fk_comment_note`
    FOREIGN KEY (`note_id`) REFERENCES `note` (`note_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_author`
    FOREIGN KEY (`author_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_parent`
    FOREIGN KEY (`parent_id`) REFERENCES `comment` (`comment_id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `comment_like` (
  `comment_like_id` INT NOT NULL AUTO_INCREMENT,
  `comment_id` INT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_like_id`),
  UNIQUE KEY `uk_comment_like_comment_user` (`comment_id`, `user_id`),
  KEY `idx_comment_like_user_id` (`user_id`),
  CONSTRAINT `fk_comment_like_comment`
    FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_like_user`
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `question_list` (
  `question_list_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NOT NULL,
  `type` INT NOT NULL DEFAULT 1,
  `description` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`question_list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `question_list_item` (
  `question_list_id` INT NOT NULL,
  `question_id` INT NOT NULL,
  `rank` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`question_list_id`, `question_id`),
  KEY `idx_question_list_item_question_id` (`question_id`),
  CONSTRAINT `fk_question_list_item_list`
    FOREIGN KEY (`question_list_id`) REFERENCES `question_list` (`question_list_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_question_list_item_question`
    FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `message` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `receiver_id` BIGINT NOT NULL,
  `sender_id` BIGINT NOT NULL,
  `type` INT NOT NULL,
  `target_id` INT DEFAULT NULL,
  `target_type` INT DEFAULT NULL,
  `content` TEXT,
  `is_read` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  KEY `idx_message_receiver_id` (`receiver_id`),
  KEY `idx_message_sender_id` (`sender_id`),
  CONSTRAINT `fk_message_receiver`
    FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_message_sender`
    FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `statistic` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login_count` INT NOT NULL DEFAULT 0,
  `register_count` INT NOT NULL DEFAULT 0,
  `total_register_count` INT NOT NULL DEFAULT 0,
  `note_count` INT NOT NULL DEFAULT 0,
  `submit_note_count` INT NOT NULL DEFAULT 0,
  `total_note_count` INT NOT NULL DEFAULT 0,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_statistic_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
