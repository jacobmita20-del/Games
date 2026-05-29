import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const games = mysqlTable("games", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  genre: mysqlEnum("genre", ["Action", "Puzzle", "Adventure", "Sports", "Strategy", "Arcade"]).notNull(),
  year: int("year"),
  description: text("description"),
  thumbnail: varchar("thumbnail", { length: 512 }),
  swfUrl: varchar("swfUrl", { length: 512 }).notNull(),
  featured: boolean("featured").default(false).notNull(),
  difficulty: mysqlEnum("difficulty", ["Easy", "Medium", "Hard"]).default("Medium").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Game = typeof games.$inferSelect;
export type InsertGame = typeof games.$inferInsert;

export const ratings = mysqlTable("ratings", {
  id: int("id").autoincrement().primaryKey(),
  gameId: int("gameId").notNull(),
  userId: int("userId").notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  review: text("review"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Rating = typeof ratings.$inferSelect;
export type InsertRating = typeof ratings.$inferInsert;

export const leaderboards = mysqlTable("leaderboards", {
  id: int("id").autoincrement().primaryKey(),
  gameId: int("gameId").notNull(),
  userId: int("userId").notNull(),
  score: int("score").notNull(),
  playerName: varchar("playerName", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Leaderboard = typeof leaderboards.$inferSelect;
export type InsertLeaderboard = typeof leaderboards.$inferInsert;

export const guides = mysqlTable("guides", {
  id: int("id").autoincrement().primaryKey(),
  gameId: int("gameId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  tips: text("tips"),
  keyboardShortcuts: text("keyboardShortcuts"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Guide = typeof guides.$inferSelect;
export type InsertGuide = typeof guides.$inferInsert;