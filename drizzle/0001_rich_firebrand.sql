CREATE TABLE `games` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`genre` enum('Action','Puzzle','Adventure','Sports','Strategy','Arcade') NOT NULL,
	`year` int,
	`description` text,
	`thumbnail` varchar(512),
	`swfUrl` varchar(512) NOT NULL,
	`featured` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `games_id` PRIMARY KEY(`id`)
);
