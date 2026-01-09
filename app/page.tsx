"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
export default function Home() {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.inggestInvoke.mutationOptions({}));

  return (
    <div>
      <Button onClick={() => invoke.mutate({ text: "tushardev04gmail.com" })}>
        invoke inngest
      </Button>
    </div>
  );
}
