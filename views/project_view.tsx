"use client";

import Split from "react-split";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MessagesContainer } from "@/components/ui/messages-container";
import { Suspense, useState } from "react";
import { Fragment } from "@/app/generated/prisma/client";
import { useRouter } from "next/navigation";
import FragmentView from "@/components/ui/fragmentView";
import FragmentFallback from "@/components/ui/fragmentFallback";
import { cn } from "@/lib/utils";

interface Props {
  projectId: string;
}

const ProjectView = ({ projectId }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [fragmentOption, setFragmentOption] = useState("Page View");
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
                setFragmentOption={setFragmentOption}
                projectId={projectId}
                activeFragment={activeFragment}
                setActiveFragment={setActiveFragment}
              />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-col min-h-0 overflow-hidden border-r bg-white">
          <div className="border-b px-4 py-2 flex items-center relative">
            <div className=" text-gray-700 font-semibold text-sm absolute left-1/2 -translate-x-1/2">
              Preview
            </div>

            {/* Switch button */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="ml-auto rounded-md px-2 py-1 font-medium text-sm bg-gray-200 hover:bg-gray-300 transition"
            >
              {fragmentOption}
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute right-10 top-full mt-2 w-32 rounded-sm border bg-white shadow-lg z-50">
                <button
                  className={cn(
                    "w-full cursor-pointer text-left rounded-md  px-3 py-2 font-bold text-sm hover:bg-gray-100 ",
                    fragmentOption === "Page View" && "bg-gray-300 font-medium",
                  )}
                  onClick={() => {
                    setFragmentOption("Page View");
                    setIsOpen(false);
                  }}
                >
                  Page View
                </button>

                <button
                  className={cn(
                    "w-full cursor-pointer text-left px-3 rounded-md py-2 text-sm hover:bg-gray-100",
                    fragmentOption === "Code View" && "bg-gray-300 font-medium",
                  )}
                  onClick={() => {
                    setFragmentOption("Code View");
                    setIsOpen(false);
                  }}
                >
                  Code View
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-auto">
            {activeFragment ? (
              <FragmentView
                fragmentOption={fragmentOption}
                fragment={activeFragment}
              />
            ) : (
              <FragmentFallback />
            )}
            {/* <FragmentFallback /> */}
          </div>
        </div>
      </Split>
    </div>
  );
};

export default ProjectView;
