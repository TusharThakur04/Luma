"use client";

import Split from "react-split";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MessagesContainer } from "@/components/ui/messages-container";
import { Suspense } from "react";

interface Props {
  projectId: string;
}

const ProjectView = ({ projectId }: Props) => {
  const trpc = useTRPC();

  const { data: project } = useSuspenseQuery(
    trpc.project.getProject.queryOptions({
      id: projectId,
    })
  );

  return (
    <div className="h-screen">
      <Split
        className="flex h-full"
        direction="horizontal"
        sizes={[35, 65]}
        minSize={[240, 360]}
        gutterSize={3}
      >
        <div className="flex flex-col overflow-hidden bg-white">
          <div className="border-b px-4 py-2 text-sm font-semibold text-gray-600">
            Messages
          </div>

          <div className="flex-1 overflow-auto p-3">
            <Suspense fallback={<p>loading...</p>}>
              <MessagesContainer projectId={projectId} />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col min-h-0 overflow-hidden border-r bg-white">
          <div className="border-b px-4 py-2 text-sm font-semibold text-gray-600">
            Project
          </div>

          <div className="flex-1 overflow-auto p-4">
            {JSON.stringify(project, null, 2)}
          </div>
        </div>
      </Split>
    </div>
  );
};

export default ProjectView;
