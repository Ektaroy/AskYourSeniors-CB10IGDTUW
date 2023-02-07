import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  updateUserProfile: protectedProcedure
    .input(z.object({ branch: z.string(), year: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { branch, year } = input;
      const { user } = ctx.session;
      const updatedUser = await ctx.prisma.user.update({
        where: { id: user.id },
        data: { branch, year },
      });
      return updatedUser;
    }),

  leaderboard: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      take: 50,
    });
    // for every user, count the number of approved questions and approved answers
    const leaderboard = await Promise.all(
      users.map(async (user) => {
        const questions = await ctx.prisma.question.count({
          where: {
            userId: user.id,
            approved: true,
          },
        });
        const answers = await ctx.prisma.answer.count({
          where: {
            userId: user.id,
            approved: true,
          },
        });
        return {
          ...user,
          total: questions + answers,
        };
      })
    );
    return leaderboard;
  }),
});
