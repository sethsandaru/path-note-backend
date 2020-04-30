CREATE TABLE `note_spaces`(
    `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT(11) NOT NULL,

    # Note Default Detail
    `noteKey` VARCHAR(50) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255),

    # Note Securities Configuration
    `has_password` TINYINT(1) DEFAULT 0,
    `password` VARCHAR(255),
    `visitor_can_view` TINYINT(1) DEFAULT 0,
    `visitor_can_edit` TINYINT(1) DEFAULT 0,

    # Note-Styling
    `background_image_file_id` INT(11) NULL,
    `font_size` INT(2) DEFAULT 14,

    `created_date` DATETIME DEFAULT NOW(),
    `updated_date` DATETIME,

    INDEX(`user_id`), # This index will help to retrieve notes of user faster.
    UNIQUE(`noteKey`, `user_id`) # This is a LOGIC, also quick retrieve too.
);