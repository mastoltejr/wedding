-- CreateTable
CREATE TABLE `Person` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shortCode` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `suffix` ENUM('Sr', 'Jr', 'II', 'III', 'IV', 'V') NULL,
    `title` ENUM('Mr', 'Mrs', 'Ms', 'Dr') NULL,
    `family` ENUM('Stolte', 'Garza') NULL,
    `comment` VARCHAR(191) NULL,
    `groupLabel` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `phoneAlerts` BOOLEAN NOT NULL DEFAULT false,
    `mealConsideration` VARCHAR(191) NULL,
    `highchair` BOOLEAN NOT NULL DEFAULT false,
    `wheelchair` BOOLEAN NOT NULL DEFAULT false,
    `inviteRehearsal` BOOLEAN NOT NULL DEFAULT false,
    `inviteWedding` BOOLEAN NOT NULL DEFAULT false,
    `inviteAfterParty` BOOLEAN NOT NULL DEFAULT false,
    `inviteSunday` BOOLEAN NOT NULL DEFAULT false,
    `saveTheDate` ENUM('Yes', 'No', 'Unsure') NULL,
    `rsvpRehearsal` BOOLEAN NULL,
    `rsvpWedding` BOOLEAN NULL,
    `rsvpAfterParty` BOOLEAN NULL,
    `rsvpSunday` BOOLEAN NULL,
    `lastUpdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastRefresh` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Person_shortCode_key`(`shortCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupLabel` VARCHAR(191) NOT NULL,
    `language` ENUM('english', 'spanish', 'swissGerman') NOT NULL DEFAULT 'english',
    `paperless` BOOLEAN NOT NULL DEFAULT false,
    `address` VARCHAR(191) NULL,
    `address2` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(2) NULL,
    `zip` INTEGER NULL,
    `country` VARCHAR(191) NULL,
    `mailInvite` BOOLEAN NOT NULL DEFAULT false,
    `mailThankyou` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_groupLabel_fkey` FOREIGN KEY (`groupLabel`) REFERENCES `Group`(`groupLabel`) ON DELETE SET NULL ON UPDATE CASCADE;
