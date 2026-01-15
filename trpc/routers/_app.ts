import { createTRPCRouter } from "../init";
import { messageRouter } from "@/routes/messageRoute";
export const appRouter = createTRPCRouter({
  message: messageRouter,
});
export type AppRouter = typeof appRouter;
