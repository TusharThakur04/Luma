import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../trpc/init";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";

export const messageRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        message: z.string().min(1, { message: "message is required" }),
      })
    )
    .mutation(async ({ input }) => {
      const message = await prisma.message.create({
        data: {
          content: input.message,
          role: "User",
          type: "Result",
        },
      });
      await inngest.send({
        name: "agent-prompt",
        data: {
          prompt: input.message,
        },
      });
      return message;
    }),

  getMessages: baseProcedure.query(async () => {
    const messages = await prisma.message.findMany({
      include: {
        fragment: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  }),
});
