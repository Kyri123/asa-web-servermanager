ALTER TABLE `server` MODIFY COLUMN `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `server_settings` MODIFY COLUMN `map` varchar(255) DEFAULT 'TheIsland_WP';--> statement-breakpoint
ALTER TABLE `server_settings` MODIFY COLUMN `max_players` smallint DEFAULT 70;