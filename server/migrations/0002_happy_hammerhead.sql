ALTER TABLE `user` MODIFY COLUMN `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `created_at` timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `image`;