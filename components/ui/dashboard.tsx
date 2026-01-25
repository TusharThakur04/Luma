import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DashboardProps {
  classname?: string;
}

const Dashboard = ({ classname }: DashboardProps) => {
  const [isOpen, setOpen] = useState(false);

  const trpc = useTRPC();
  const router = useRouter();

  const { data: projects } = useQuery(trpc.project.getProjects.queryOptions());

  return (
    <div
      className={cn(
        "p-2 text-neutral-400 bg-neutral-900 h-full flex flex-col",
        classname,
      )}
    >
      <div className="p-2 inline-flex w-fit gap-1  items-center h-13">
        <Image
          className="h-7 w-7"
          src="/logo.png"
          alt="Luma"
          height={30}
          width={30}
        />

        <span className="text-2xl text-gray-50 font-extrabold">Luma</span>
      </div>
      <div className="p-1 mt-5 overflow-auto flex-1">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-1 text-[1rem] inline-flex items-center text-gray-200 rounded-lg hover:bg-gray-700/50 transition-all"
        >
          {isOpen ? <ChevronDown height={20} /> : <ChevronRight height={20} />}
          <span>Projects</span>
        </button>
        {isOpen && (
          <ul
            className={cn(
              "mt-2 ml-6 space-y-1 transition-all",
              !isOpen && "hidden",
            )}
          >
            {projects &&
              projects.map((project, index) => (
                <li
                  onClick={() => router.push(`/projects/${project.id}`)}
                  key={index}
                  className="text-[0.9rem] text-gray-400 hover:text-gray-200 cursor-pointer"
                >
                  {project.name}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
