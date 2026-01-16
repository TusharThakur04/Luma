import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../trpc/init";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import randomName from "@scaleway/random-name";

export const projectRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        message: z
          .string()
          .min(1, { message: "prompt is required is required" }),
      })
    )
    .mutation(async ({ input }) => {
      const createdProject = await prisma.project.create({
        data: {
          name: randomName(),
          message: {
            create: {
              content: input.message,
              role: "User",
              type: "Result",
            },
          },
        },
      });
      await inngest.send({
        name: "agent-prompt",
        data: {
          prompt: input.message,
          projectId: createdProject.id,
        },
      });
      return createdProject;
    }),

  getProjects: baseProcedure.query(async () => {
    const messages = await prisma.project.findMany({
      select: {
        name: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  }),
});
