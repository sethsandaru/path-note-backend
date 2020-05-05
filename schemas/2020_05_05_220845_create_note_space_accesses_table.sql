CREATE TABLE `note_space_accesses`(
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `note_space_id` INT(11) NOT NULL,

    `api_key` VARCHAR(50) NOT NULL,
    `ip_address` VARCHAR(50) NOT NULL,

    `created_date` DATETIME DEFAULT NOW(),

    INDEX(`note_space_id`) # This index will help to retrieve notes of user faster.
);