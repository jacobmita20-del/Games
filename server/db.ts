import { eq, like, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, games, ratings, leaderboards, guides } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllGames() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(games);
}

export async function getGameById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(games).where(eq(games.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getGamesByGenre(genre: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(games).where(eq(games.genre, genre as any));
}

export async function getFeaturedGames() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(games).where(eq(games.featured, true)).limit(8);
}

export async function searchGames(query: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(games).where(
    like(games.title, `%${query}%`)
  );
}

export async function getRatingsByGameId(gameId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ratings).where(eq(ratings.gameId, gameId));
}

export async function getAverageRating(gameId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(ratings).where(eq(ratings.gameId, gameId));
  if (result.length === 0) return 0;
  const sum = result.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / result.length) * 10) / 10;
}

export async function getLeaderboardByGameId(gameId: number, limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leaderboards)
    .where(eq(leaderboards.gameId, gameId))
    .orderBy(desc(leaderboards.score))
    .limit(limit);
}

export async function getGuideByGameId(gameId: number) {
  const db = await getDb();
  if (!db) return { tips: [], shortcuts: [] };
  const result = await db.select().from(guides).where(eq(guides.gameId, gameId)).limit(1);
  return result.length > 0 ? result[0] : { tips: [], shortcuts: [] };
}
