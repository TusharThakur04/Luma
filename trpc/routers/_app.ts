import { projectRouter } from "@/routes/projectRoute";
import { createTRPCRouter } from "../init";
import { messageRouter } from "@/routes/messageRoute";
export const appRouter = createTRPCRouter({
  message: messageRouter,
  project: projectRouter,
});
export type AppRouter = typeof appRouter;
