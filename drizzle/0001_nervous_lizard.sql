PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_storage_info` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quantity` integer NOT NULL,
	`expiration_date` text,
	`location` integer NOT NULL,
	`product_info` integer NOT NULL,
	FOREIGN KEY (`location`) REFERENCES `location`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_info`) REFERENCES `product_info`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_storage_info`("id", "quantity", "expiration_date", "location", "product_info") SELECT "id", "quantity", "expiration_date", "location", "product_info" FROM `storage_info`;--> statement-breakpoint
DROP TABLE `storage_info`;--> statement-breakpoint
ALTER TABLE `__new_storage_info` RENAME TO `storage_info`;--> statement-breakpoint
PRAGMA foreign_keys=ON;