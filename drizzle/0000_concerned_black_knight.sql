CREATE TABLE `baskets` (
	`session` text PRIMARY KEY NOT NULL,
	`cart` text DEFAULT '[]' NOT NULL,
	`wishlist` text DEFAULT '[]' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `checkouts` (
	`session` text PRIMARY KEY NOT NULL,
	`details` text NOT NULL,
	`updated` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` text PRIMARY KEY NOT NULL,
	`session` text NOT NULL,
	`filename` text NOT NULL,
	`size` integer NOT NULL,
	`type` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `uploads_session_idx` ON `uploads` (`session`);