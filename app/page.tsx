"use client";
import { Button } from "@/components/ui/button";
import Dashboard from "@/components/ui/dashboard";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isOpen, setOpen] = useState(false);

  const router = useRouter();
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.project.create.mutationOptions({
      onSuccess: (data) => {
        router.push(`/projects/${data.id}`);
      },
    }),
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        console.log("switched to desktop → closing");
        setOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="h-screen w-screen flex">
      {!isOpen && (
        <div className={cn("hidden md:block w-68")}>
          <Dashboard />
        </div>
      )}

      <div className="md:hidden fixed z-10 top-2 left-2">
        <MenuIcon
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer hover:scale-95 transition"
          width={30}
          height={25}
        />
      </div>
      <div className="flex-1 relative flex justify-center items-center bg-cover bg-center overflow-hidden bg-[url('/noisy-gradients1.png')]">
        <div className="relative z-10 w-full flex justify-center">
          <div className="w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] gap-1 items-center flex">
            <Textarea
              className="bg-gray-300 p-4.5 flex-1 min-h-15 resize-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="write a prompt to create web page...."
            />

            <Button
              className="w-fit h-10 "
              onClick={() => invoke.mutate({ message: value })}
            >
              create
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          " rounded-lg mx-1 fixed h-full inset-x-0 top-20 z-1000 duration-300",
          !isOpen && "translate-y-full",
        )}
      >
        <Dashboard classname={"rounded-lg"} />
      </div>
    </div>
  );
}
