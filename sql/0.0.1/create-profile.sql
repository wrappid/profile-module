
-- ----------------------------------------------------------------------------
-- Table application.AddressTypes
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `application`.`AddressTypes` (
  `id` INT NOT NULL,
  `type` VARCHAR(255) NULL DEFAULT '',
  `isActive` TINYINT NULL DEFAULT 1,
  `_status` VARCHAR(255) NULL,
  `deletedAt` DATETIME NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `createdBy` INT NULL,
  `updatedBy` INT NULL,
  `deletedBy` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `AddressTypes_createdBy_fkey`
    FOREIGN KEY (`createdBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `AddressTypes_deletedBy_fkey`
    FOREIGN KEY (`deletedBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `AddressTypes_updatedBy_fkey`
    FOREIGN KEY (`updatedBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);


-- ----------------------------------------------------------------------------
-- Table application.PersonAddresses
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `application`.`PersonAddresses` (
  `id` INT NOT NULL,
  `fullName` VARCHAR(255) NULL DEFAULT '',
  `phone` VARCHAR(255) NULL DEFAULT '',
  `addLine1` VARCHAR(255) NULL DEFAULT '',
  `addLine2` VARCHAR(255) NULL DEFAULT '',
  `landmark` VARCHAR(255) NULL DEFAULT '',
  `city` VARCHAR(255) NULL DEFAULT '',
  `state` VARCHAR(255) NULL DEFAULT '',
  `district` VARCHAR(255) NULL DEFAULT '',
  `pin` VARCHAR(255) NULL DEFAULT '',
  `country` VARCHAR(255) NULL DEFAULT '',
  `status` VARCHAR(255) NULL DEFAULT '',
  `isDefault` TINYINT NULL DEFAULT 1,
  `isActive` TINYINT NULL DEFAULT 1,
  `_status` VARCHAR(255) NULL,
  `deletedAt` DATETIME NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `addressTypeId` INT NULL,
  `personId` INT NULL,
  `createdBy` INT NULL,
  `updatedBy` INT NULL,
  `deletedBy` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `PersonAddresses_addressTypeId_fkey`
    FOREIGN KEY (`addressTypeId`)
    REFERENCES `application`.`AddressTypes` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonAddresses_createdBy_fkey`
    FOREIGN KEY (`createdBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonAddresses_deletedBy_fkey`
    FOREIGN KEY (`deletedBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonAddresses_personId_fkey`
    FOREIGN KEY (`personId`)
    REFERENCES `application`.`Persons` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonAddresses_updatedBy_fkey`
    FOREIGN KEY (`updatedBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);

-- ----------------------------------------------------------------------------
-- Table application.PersonDocs
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `application`.`PersonDocs` (
  `id` INT NOT NULL,
  `type` VARCHAR(255) NULL DEFAULT '',
  `description` VARCHAR(255) NULL DEFAULT '',
  `docUrl` VARCHAR(255) NULL DEFAULT '',
  `isActive` TINYINT NULL DEFAULT 1,
  `_status` VARCHAR(255) NULL,
  `deletedAt` DATETIME NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `personId` INT NULL,
  `createdBy` INT NULL,
  `updatedBy` INT NULL,
  `deletedBy` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `PersonDocs_createdBy_fkey`
    FOREIGN KEY (`createdBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonDocs_deletedBy_fkey`
    FOREIGN KEY (`deletedBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonDocs_personId_fkey`
    FOREIGN KEY (`personId`)
    REFERENCES `application`.`Persons` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonDocs_updatedBy_fkey`
    FOREIGN KEY (`updatedBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);

-- ----------------------------------------------------------------------------
-- Table application.PersonEducations
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `application`.`PersonEducations` (
  `id` INT NOT NULL,
  `type` VARCHAR(255) NULL DEFAULT '',
  `degree` VARCHAR(255) NULL DEFAULT '',
  `school` VARCHAR(255) NULL DEFAULT '',
  `location` VARCHAR(255) NULL DEFAULT '',
  `board` VARCHAR(255) NULL DEFAULT '',
  `field` VARCHAR(255) NULL DEFAULT '',
  `startMonth` VARCHAR(255) NULL DEFAULT '',
  `startYear` VARCHAR(255) NULL DEFAULT '',
  `endMonth` VARCHAR(255) NULL DEFAULT '',
  `endYear` VARCHAR(255) NULL DEFAULT '',
  `startDate` DATETIME NULL,
  `endDate` DATETIME NULL,
  `isActive` TINYINT NULL DEFAULT 1,
  `_status` VARCHAR(255) NULL,
  `deletedAt` DATETIME NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `personId` INT NULL,
  `createdBy` INT NULL,
  `updatedBy` INT NULL,
  `deletedBy` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `PersonEducations_createdBy_fkey`
    FOREIGN KEY (`createdBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonEducations_deletedBy_fkey`
    FOREIGN KEY (`deletedBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonEducations_personId_fkey`
    FOREIGN KEY (`personId`)
    REFERENCES `application`.`Persons` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonEducations_updatedBy_fkey`
    FOREIGN KEY (`updatedBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);

-- ----------------------------------------------------------------------------
-- Table application.PersonExperiences
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `application`.`PersonExperiences` (
  `id` INT NOT NULL,
  `type` VARCHAR(255) NULL DEFAULT '',
  `designation` VARCHAR(255) NULL DEFAULT '',
  `organization` VARCHAR(255) NULL DEFAULT '',
  `description` VARCHAR(255) NULL DEFAULT '',
  `field` VARCHAR(255) NULL DEFAULT '',
  `location` VARCHAR(255) NULL DEFAULT '',
  `startMonth` VARCHAR(255) NULL DEFAULT '',
  `startYear` VARCHAR(255) NULL DEFAULT '',
  `endMonth` VARCHAR(255) NULL DEFAULT '',
  `endYear` VARCHAR(255) NULL DEFAULT '',
  `startDate` DATETIME NULL,
  `endDate` DATETIME NULL,
  `isActive` TINYINT NULL DEFAULT 1,
  `_status` VARCHAR(255) NULL,
  `deletedAt` DATETIME NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `personId` INT NULL,
  `createdBy` INT NULL,
  `updatedBy` INT NULL,
  `deletedBy` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `PersonExperiences_createdBy_fkey`
    FOREIGN KEY (`createdBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonExperiences_deletedBy_fkey`
    FOREIGN KEY (`deletedBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonExperiences_personId_fkey`
    FOREIGN KEY (`personId`)
    REFERENCES `application`.`Persons` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `PersonExperiences_updatedBy_fkey`
    FOREIGN KEY (`updatedBy`)
    REFERENCES `application`.`Users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);

