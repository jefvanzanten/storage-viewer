PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_product_info` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` real,
	`imgUrl` text,
	`brand_id` integer,
	`product_name_id` integer NOT NULL,
	`unit_type_id` integer,
	`category_id` integer,
	FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_name_id`) REFERENCES `product_name`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`unit_type_id`) REFERENCES `unit_type`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_product_info`("id", "content", "imgUrl", "brand_id", "product_name_id", "unit_type_id", "category_id") SELECT "id", "content", "imgUrl", "brand_id", "product_name_id", "unit_type_id", "category_id" FROM `product_info`;--> statement-breakpoint
DROP TABLE `product_info`;--> statement-breakpoint
ALTER TABLE `__new_product_info` RENAME TO `product_info`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `product_info_imgUrl_unique` ON `product_info` (`imgUrl`);--> statement-breakpoint
CREATE TABLE `__new_storage_info` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quantity` integer NOT NULL,
	`expiration_date` text,
	`location_id` integer NOT NULL,
	`product_info_id` integer NOT NULL,
	FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_info_id`) REFERENCES `product_info`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_storage_info`("id", "quantity", "expiration_date", "location_id", "product_info_id") SELECT "id", "quantity", "expiration_date", "location_id", "product_info_id" FROM `storage_info`;--> statement-breakpoint
DROP TABLE `storage_info`;--> statement-breakpoint
ALTER TABLE `__new_storage_info` RENAME TO `storage_info`;