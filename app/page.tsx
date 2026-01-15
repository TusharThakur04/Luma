"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
export default function Home() {
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const invoke = useMutation(trpc.message.create.mutationOptions({}));
  const messages = useQuery(trpc.message.getMessages.queryOptions());

  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => invoke.mutate({ message: value })}>
        invoke inngest
      </Button>
      {JSON.stringify(messages, null, 2)}
    </div>
  );
}
