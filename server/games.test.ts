import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("games router", () => {
  const ctx = createPublicContext();
  const caller = appRouter.createCaller(ctx);

  it("should list all games", async () => {
    const games = await caller.games.list();
    expect(Array.isArray(games)).toBe(true);
    expect(games.length).toBeGreaterThan(0);
    
    // Verify game structure
    if (games.length > 0) {
      const game = games[0];
      expect(game).toHaveProperty("id");
      expect(game).toHaveProperty("title");
      expect(game).toHaveProperty("genre");
      expect(game).toHaveProperty("swfUrl");
    }
  });

  it("should fetch featured games", async () => {
    const featured = await caller.games.featured();
    expect(Array.isArray(featured)).toBe(true);
    
    // Featured games should have featured flag set to true
    featured.forEach((game) => {
      expect(game.featured).toBe(true);
    });
  });

  it("should filter games by genre", async () => {
    const actionGames = await caller.games.byGenre({ genre: "Action" });
    expect(Array.isArray(actionGames)).toBe(true);
    
    // All returned games should be of Action genre
    actionGames.forEach((game) => {
      expect(game.genre).toBe("Action");
    });
  });

  it("should search games by title", async () => {
    const results = await caller.games.search({ query: "Defend" });
    expect(Array.isArray(results)).toBe(true);
    
    // Results should contain games matching the search query
    results.forEach((game) => {
      expect(game.title.toLowerCase()).toContain("defend");
    });
  });

  it("should fetch a game by ID", async () => {
    // First get a game to use its ID
    const allGames = await caller.games.list();
    if (allGames.length > 0) {
      const gameId = allGames[0].id;
      const game = await caller.games.byId({ id: gameId });
      
      expect(game).toBeDefined();
      expect(game?.id).toBe(gameId);
      expect(game?.title).toBeDefined();
    }
  });

  it("should return undefined for non-existent game ID", async () => {
    const game = await caller.games.byId({ id: 99999 });
    expect(game).toBeUndefined();
  });

  it("should have valid genre values", async () => {
    const validGenres = ["Action", "Puzzle", "Adventure", "Sports", "Strategy", "Arcade"];
    const games = await caller.games.list();
    
    games.forEach((game) => {
      expect(validGenres).toContain(game.genre);
    });
  });

  it("should have all required game fields", async () => {
    const games = await caller.games.list();
    
    games.forEach((game) => {
      expect(game.id).toBeDefined();
      expect(typeof game.id).toBe("number");
      
      expect(game.title).toBeDefined();
      expect(typeof game.title).toBe("string");
      
      expect(game.genre).toBeDefined();
      expect(typeof game.genre).toBe("string");
      
      expect(game.swfUrl).toBeDefined();
      expect(typeof game.swfUrl).toBe("string");
      
      expect(typeof game.featured).toBe("boolean");
    });
  });
});
