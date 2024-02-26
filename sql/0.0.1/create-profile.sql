
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
  PRIMARY KEY (`id`)
  );


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
  PRIMARY KEY (`id`)
  );

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
  PRIMARY KEY (`id`)
);

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
  PRIMARY KEY (`id`)
  );

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
  PRIMARY KEY (`id`)
  );

