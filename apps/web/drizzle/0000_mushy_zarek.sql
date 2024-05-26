-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY,
	`title` text NOT NULL,
	`description` text,
	`due_date` numeric,
	`priority` text DEFAULT 'Medium',
	`category_id` integer,
	`completed` numeric DEFAULT 0,
	`created_at` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `task_categories` (
	`category_id` integer PRIMARY KEY AUTOINCREMENT,
	`category_name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `task_list` (
	`task_id` integer PRIMARY KEY AUTOINCREMENT,
	`task_title` text NOT NULL,
	`task_description` text,
	`due_date` numeric,
	`task_priority` text DEFAULT 'Medium',
	`task_category_id` integer,
	`is_completed` numeric DEFAULT 0,
	`created_on` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`task_category_id`) REFERENCES `task_categories`(`category_id`) ON UPDATE no action ON DELETE no action
);

*/