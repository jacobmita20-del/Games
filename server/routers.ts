import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  games: router({
    list: publicProcedure.query(async () => {
      const { getAllGames } = await import("./db");
      return getAllGames();
    }),
    featured: publicProcedure.query(async () => {
      const { getFeaturedGames } = await import("./db");
      return getFeaturedGames();
    }),
    byGenre: publicProcedure.input((input: any) => input.genre).query(async ({ input }) => {
      const { getGamesByGenre } = await import("./db");
      return getGamesByGenre(input);
    }),
    search: publicProcedure.input((input: any) => input.query).query(async ({ input }) => {
      const { searchGames } = await import("./db");
      return searchGames(input);
    }),
    byId: publicProcedure.input((input: any) => input.id).query(async ({ input }) => {
      const { getGameById } = await import("./db");
      return getGameById(input);
    }),
  }),

  ratings: router({
    byGameId: publicProcedure.input((input: any) => input.gameId).query(async ({ input }) => {
      const { getRatingsByGameId, getAverageRating } = await import("./db");
      const reviews = await getRatingsByGameId(input);
      const average = await getAverageRating(input);
      return { reviews, average };
    }),
  }),

  leaderboards: router({
    byGameId: publicProcedure.input((input: any) => input.gameId).query(async ({ input }) => {
      const { getLeaderboardByGameId } = await import("./db");
      return getLeaderboardByGameId(input, 10);
    }),
  }),

  guides: router({
    byGameId: publicProcedure.input((input: any) => input.gameId).query(async ({ input }) => {
      const { getGuideByGameId } = await import("./db");
      return getGuideByGameId(input);
    }),
  }),
});

export type AppRouter = typeof appRouter;
