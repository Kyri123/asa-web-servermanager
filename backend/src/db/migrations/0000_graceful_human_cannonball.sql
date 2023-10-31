CREATE TABLE `permission` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`permission` varchar(255) NOT NULL,
	CONSTRAINT `permission_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`seed` varchar(255) NOT NULL,
	`image` varchar(255),
	`lastLogin` timestamp,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
