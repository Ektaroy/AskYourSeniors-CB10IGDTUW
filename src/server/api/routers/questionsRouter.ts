import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const questionsRouter = createTRPCRouter({
  createQuestion: protectedProcedure
    .input(z.object({ statement: z.string(), category: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const { statement } = input;
      const { user } = ctx.session;
      try {
        const updatedQuestion = await ctx.prisma.question.create({
          data: {
            statement,
            user: {
              connect: {
                id: user.id,
              },
            },
            category: input.category,
          },
        });
        return {
          success: true,
          message: "Question created successfully",
          question: updatedQuestion,
        };
      } catch (error) {
        throw new Error("Internal Server Error");
      }
    }),

  getQuestions: protectedProcedure
    .input(z.object({ category: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const { category } = input;
      try {
        if (category) {
          const questions = await ctx.prisma.question.findMany({
            where: {
              category,
              approved: true,
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
              category: true,
              id: true,
            },
          });
          return {
            success: true,
            message: "Questions fetched successfully",
            questions,
          };
        } else {
          const questions = await ctx.prisma.question.findMany({
            where: {
              approved: true,
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
              category: true,
              id: true,
            },
          });
          return {
            success: true,
            message: "Questions fetched successfully",
            questions,
          };
        }
      } catch (error) {
        throw new Error("Internal Server Error");
      }
    }),

  getNonApprovedQuestions: protectedProcedure
    .input(z.object({ category: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const { category } = input;
      const { user } = ctx.session;
      if (user.role !== "ADMIN") {
        throw new Error("Unauthorized");
      } else {
        try {
          if (category) {
            const questions = await ctx.prisma.question.findMany({
              where: {
                category,
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
                category: true,
                id: true,
              },
            });
            return {
              success: true,
              message: "Questions fetched successfully",
              questions,
            };
          } else {
            const questions = await ctx.prisma.question.findMany({
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
                category: true,
                id: true,
              },
            });
            return {
              success: true,
              message: "Questions fetched successfully",
              questions,
            };
          }
        } catch (error) {
          throw new Error("Internal Server Error");
        }
      }
    }),

  approveQuestion: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const { user } = ctx.session;
      if (user.role !== "ADMIN") {
        throw new Error("Unauthorized");
      } else {
        try {
          const question = await ctx.prisma.question.update({
            where: {
              id,
            },
            data: {
              approved: true,
            },
          });
          return {
            success: true,
            message: "Question approved successfully",
            question,
          };
        } catch (error) {
          throw new Error("Internal Server Error");
        }
      }
    }),

  deleteQuestion: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const { user } = ctx.session;
      if (user.role !== "ADMIN") {
        throw new Error("Unauthorized");
      } else {
        try {
          const question = await ctx.prisma.question.delete({
            where: {
              id,
            },
          });
          return {
            success: true,
            message: "Question deleted successfully",
            question,
          };
        } catch (error) {
          throw new Error("Internal Server Error");
        }
      }
    }),
});
