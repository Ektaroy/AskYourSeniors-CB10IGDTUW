import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userDetailsRouter = createTRPCRouter({
  addUserDetails: protectedProcedure
    .input(z.object({ branch: z.string(), year: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { branch, year } = input;
      const { user } = ctx.session;
      try {
        const updatedUser = await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            year: year,
            branch: branch,
          },
        });
        return updatedUser;
      } catch (error) {
        throw new Error("Internal Server Error");
      }
    }),
});
