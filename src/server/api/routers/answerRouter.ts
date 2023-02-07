import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  nonApprovedAnswers: protectedProcedure
    .input(z.object({ category: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const { category } = input;
      const { user } = ctx.session;
      if (user.role !== "ADMIN") {
        throw new Error("Not authorized");
      } else {
        try {
          if (category) {
            const answers = await ctx.prisma.answer.findMany({
              where: {
                approved: false,
              },
              select: {
                user: {
                  select: {
                    name: true,
                    image: true,
                    id: true,
                    year: true,
                    branch: true,
                  },
                },
                statement: true,
                id: true,
                question: true,
              },
            });
            return {
              success: true,
              message: "Answers fetched successfully",
              answers,
            };
          } else {
            const answers = await ctx.prisma.answer.findMany({
              where: {
                approved: false,
              },
              select: {
                user: {
                  select: {
                    name: true,
                    image: true,
                    id: true,
                    year: true,
                    branch: true,
                  },
                },
                statement: true,
                id: true,
                question: true,
              },
            });
            return {
              success: true,
              message: "Answers fetched successfully",
              answers,
            };
          }
        } catch (error) {
          throw new Error("Internal Server Error");
        }
      }
    }),

  approveAnswer: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx.session;
      if (user.role !== "ADMIN") {
        throw new Error("Not authorized");
      } else {
        try {
          const answer = await ctx.prisma.answer.update({
            where: {
              id: input.id,
            },
            data: {
              approved: true,
            },
          });
          return {
            success: true,
            message: "Answer approved successfully",
            answer,
          };
        } catch (error) {
          throw new Error("Internal Server Error");
        }
      }
    }),

  rejectAnswer: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx.session;
      if (user.role !== "ADMIN") {
        throw new Error("Not authorized");
      } else {
        try {
          const answer = await ctx.prisma.answer.delete({
            where: {
              id: input.id,
            },
          });
          return {
            success: true,
            message: "Answer rejected successfully",
            answer,
          };
        } catch (error) {
          throw new Error("Internal Server Error");
        }
      }
    }),

  approvedAnswers: protectedProcedure
    .input(z.object({ questionId: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const answers = await ctx.prisma.answer.findMany({
          where: {
            approved: true,
            questionId: input.questionId,
          },
          select: {
            user: {
              select: {
                name: true,
                image: true,
                id: true,
                year: true,
                branch: true,
              },
            },
            statement: true,
            id: true,
            question: true,
          },
        });
        return {
          success: true,
          message: "Answers fetched successfully",
          answers,
        };
      } catch (error) {
        throw new Error("Internal Server Error");
      }
    }),

  addAnswerToQuestion: protectedProcedure
    .input(z.object({ questionId: z.string(), statement: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx.session;
      try {
        const answer = await ctx.prisma.answer.create({
          data: {
            questionId: input.questionId,
            statement: input.statement,
            userId: user.id,
          },
        });
        return {
          success: true,
          message: "Answer added successfully",
          answer,
        };
      } catch (error) {
        throw new Error("Internal Server Error");
      }
    }),
});
