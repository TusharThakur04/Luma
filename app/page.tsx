import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { ClientGreeting } from "./client";
import { Suspense } from "react";
export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "world" }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>...</div>
      <Suspense fallback={<p>Loading...</p>}>
        <ClientGreeting />
      </Suspense>
    </HydrationBoundary>
  );
}
