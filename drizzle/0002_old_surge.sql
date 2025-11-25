PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_location_info` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location_id` integer,
	`parent_id` integer,
	FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parent_id`) REFERENCES `location`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_location_info`("id", "location_id", "parent_id") SELECT "id", "location_id", "parent_id" FROM `location_info`;--> statement-breakpoint
DROP TABLE `location_info`;--> statement-breakpoint
ALTER TABLE `__new_location_info` RENAME TO `location_info`;--> statement-breakpoint
PRAGMA foreign_keys=ON;