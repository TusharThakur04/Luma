"use client";

import Split from "react-split";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MessagesContainer } from "@/components/ui/messages-container";
import { Suspense, useState } from "react";
import { Fragment } from "@/app/generated/prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  projectId: string;
}

const ProjectView = ({ projectId }: Props) => {
  const router = useRouter();
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const trpc = useTRPC();

  const { data: project } = useSuspenseQuery(
    trpc.project.getProject.queryOptions({
      id: projectId,
    }),
  );

  return (
    <div className="h-screen">
      <Split
        className="flex h-full"
        direction="horizontal"
        sizes={[30, 80]}
        minSize={[240, 360]}
        gutterSize={3}
      >
        <div className="flex flex-col overflow-hidden bg-white">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-700">Messages</h2>

            <button
              onClick={() => router.push("/")}
              className="text-xs font-medium text-muted-foreground hover:text-primary transition"
            >
              ← Home
            </button>
          </div>

          <div className="flex-1 overflow-auto p-3">
            <Suspense fallback={<p>loading...</p>}>
              <MessagesContainer
                projectId={projectId}
                activeFragment={activeFragment}
                setActiveFragment={setActiveFragment}
              />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col min-h-0 overflow-hidden border-r bg-white">
          <div className="border-b px-4 py-2 text-sm font-semibold text-gray-600">
            Preview
          </div>

          <div className="flex-1 overflow-auto p-4"></div>
        </div>
      </Split>
    </div>
  );
};

export default ProjectView;
