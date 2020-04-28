CREATE TABLE `user_login_histories`(
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT(11) NOT NULL,
    `ip_address` VARCHAR(50) NOT NULL,
    `login_date` DATETIME DEFAULT NOW()
);