CREATE TABLE `server` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`query_port` int NOT NULL,
	`game_port` int NOT NULL,
	`rcon_port` int NOT NULL,
	CONSTRAINT `server_id` PRIMARY KEY(`id`),
	CONSTRAINT `server_query_port_unique` UNIQUE(`query_port`),
	CONSTRAINT `server_game_port_unique` UNIQUE(`game_port`),
	CONSTRAINT `server_rcon_port_unique` UNIQUE(`rcon_port`)
); 
--> statement-breakpoint
CREATE TABLE `server_schedule_settings` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`server_id` bigint NOT NULL,
	`update_enabled` boolean DEFAULT true,
	`update_frequency` varchar(255) DEFAULT '*/15 * * * *',
	`restart_alert_enabled` boolean DEFAULT true,
	`restart_enabled` boolean DEFAULT false,
	`restart_frequency` varchar(255) DEFAULT '0 4 * * *',
	`backups_enabled` boolean DEFAULT true,
	`backups_frequency` varchar(255) DEFAULT '0 */2 * * *',
	`backups_alert_enabled` boolean DEFAULT true,
	CONSTRAINT `server_schedule_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `server_schedule_settings_server_id_unique` UNIQUE(`server_id`)
);
--> statement-breakpoint
CREATE TABLE `server_settings` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`server_id` bigint NOT NULL,
	`map` varchar(255),
	`max_players` smallint,
	CONSTRAINT `server_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `server_settings_server_id_unique` UNIQUE(`server_id`)
);
--> statement-breakpoint
CREATE TABLE `server_actions` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`server_id` bigint NOT NULL,
	`action` varchar(255),
	`state` varchar(255),
	`message` varchar(255) DEFAULT 'Waiting for next execution and free runner...',
	`parameters` varchar(255) DEFAULT '[]',
	`canceled` boolean DEFAULT false,
	`user_id` bigint,
	CONSTRAINT `server_actions_id` PRIMARY KEY(`id`),
	CONSTRAINT `server_actions_server_id_unique` UNIQUE(`server_id`)
);
--> statement-breakpoint
CREATE TABLE `server_mods` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`server_id` bigint NOT NULL,
	`mod_id` int NOT NULL,
	`is_map_mod` boolean NOT NULL DEFAULT false,
	`mod_name` varchar(255),
	`need_update` boolean NOT NULL DEFAULT false,
	`last_update` timestamp,
	CONSTRAINT `server_mods_id` PRIMARY KEY(`id`),
	CONSTRAINT `server_mods_server_id_unique` UNIQUE(`server_id`)
);
--> statement-breakpoint
ALTER TABLE `user` RENAME COLUMN `lastLogin` TO `last_login`;--> statement-breakpoint
ALTER TABLE `user` ADD `account_disabled` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `server_schedule_settings` ADD CONSTRAINT `server_schedule_settings_server_id_server_id_fk` FOREIGN KEY (`server_id`) REFERENCES `server`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `server_settings` ADD CONSTRAINT `server_settings_server_id_server_id_fk` FOREIGN KEY (`server_id`) REFERENCES `server`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `server_actions` ADD CONSTRAINT `server_actions_server_id_server_id_fk` FOREIGN KEY (`server_id`) REFERENCES `server`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `server_actions` ADD CONSTRAINT `server_actions_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `server_mods` ADD CONSTRAINT `server_mods_server_id_server_id_fk` FOREIGN KEY (`server_id`) REFERENCES `server`(`id`) ON DELETE cascade ON UPDATE no action;