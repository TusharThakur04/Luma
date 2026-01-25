import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../trpc/init";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import randomName from "@scaleway/random-name";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        message: z
          .string()
          .min(1, { message: "prompt is required is required" }),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      console.log(input.message);
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
          userid: input.userId,
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

  getProjects: baseProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const projects = await prisma.project.findMany({
        where: {
          userid: input.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return projects;
    }),

  getProject: baseProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }
      return project;
    }),
});
