CREATE TABLE `users`(
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `created_date` DATETIME DEFAULT NOW(),
    `updated_date` DATETIME,

    UNIQUE(`email`)
);