import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import MessageCard from "./message-card";
import MessageForm from "./message-form";
import { useEffect, useRef } from "react";
interface Props {
  projectId: string;
}
export const MessagesContainer = ({ projectId }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const trpc = useTRPC();
  const { data: messages } = useSuspenseQuery(
    trpc.message.getMessages.queryOptions({
      projectId: projectId,
    })
  );
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // console.log(projectId);
  return (
    <div className="flex gap-1 flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col pt-2 pr-1">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              content={message.content}
              role={message.role}
              fragment={message.fragment}
              createdAt={message.createdAt}
              isActiveFragment={false}
              type={message.type}
              onFragmentClick={() => {}}
            />
          ))}
        </div>
        <div ref={bottomRef} />
      </div>
      <MessageForm projectId={projectId} />
    </div>
  );
};
