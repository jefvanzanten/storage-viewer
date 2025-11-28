CREATE TABLE `product_name` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `product_name_name_unique` ON `product_name` (`name`);--> statement-breakpoint
DROP INDEX `product_info_name_unique`;--> statement-breakpoint
ALTER TABLE `product_info` ADD `product_name` integer NOT NULL REFERENCES product_name(id);--> statement-breakpoint
ALTER TABLE `product_info` DROP COLUMN `name`;