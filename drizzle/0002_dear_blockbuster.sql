CREATE TABLE `guides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`gameId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`tips` text,
	`keyboardShortcuts` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `guides_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leaderboards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`gameId` int NOT NULL,
	`userId` int NOT NULL,
	`score` int NOT NULL,
	`playerName` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leaderboards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ratings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`gameId` int NOT NULL,
	`userId` int NOT NULL,
	`rating` int NOT NULL,
	`review` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ratings_id` PRIMARY KEY(`id`)
);
