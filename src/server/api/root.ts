import { createTRPCRouter } from "./trpc";
import { userDetailsRouter } from "./routers/addUserDetails";
import { questionsRouter } from "./routers/questionsRouter";
import { answerRouter } from "./routers/answerRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  userDetailsRouter: userDetailsRouter,
  questionsRouter: questionsRouter,
  answerRouter: answerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
