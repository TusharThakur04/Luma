import { getQueryClient, trpc } from "@/trpc/server";
import ProjectView from "@/views/project_view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function Page(props: Props) {
  const { projectId } = await props.params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.message.getMessages.queryOptions({ projectId }),
  );
  void queryClient.prefetchQuery(
    trpc.project.getProject.queryOptions({ id: projectId }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ProjectView projectId={projectId} />
      </Suspense>
    </HydrationBoundary>
  );
}
