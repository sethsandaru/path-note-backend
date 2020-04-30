CREATE TABLE `note_items`(
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `note_space_id` INT(11) NOT NULL,

    # Note Item Detail
    `headline` VARCHAR(50) NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `is_rich_content` TINYINT(1) DEFAULT 0,

    `created_date` DATETIME DEFAULT NOW(),
    `updated_date` DATETIME,

    INDEX(`note_space_id`) # This index will help to retrieve notes of user faster.
);