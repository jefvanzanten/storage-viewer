CREATE TABLE `brand` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `brand_name_unique` ON `brand` (`name`);--> statement-breakpoint
CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_name_unique` ON `category` (`name`);--> statement-breakpoint
CREATE TABLE `location` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `location_name_unique` ON `location` (`name`);--> statement-breakpoint
CREATE TABLE `location_info` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location` integer,
	FOREIGN KEY (`location`) REFERENCES `location`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_info` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`content` real,
	`imgUrl` text,
	`brand` integer,
	`unit_type` integer,
	`category` integer,
	FOREIGN KEY (`brand`) REFERENCES `brand`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`unit_type`) REFERENCES `unit_type`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `product_info_name_unique` ON `product_info` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `product_info_imgUrl_unique` ON `product_info` (`imgUrl`);--> statement-breakpoint
CREATE TABLE `storage_info` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quantity` integer NOT NULL,
	`expiration_date` text,
	`location` integer NOT NULL,
	`product_info` integer NOT NULL,
	`unit_type` integer NOT NULL,
	FOREIGN KEY (`location`) REFERENCES `location`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_info`) REFERENCES `product_info`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`unit_type`) REFERENCES `unit_type`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `unit_type` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unit_type_name_unique` ON `unit_type` (`name`);