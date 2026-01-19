import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import MessageCard from "./message-card";
import MessageForm from "./message-form";
import { useEffect, useRef } from "react";
import { Fragment } from "@/app/generated/prisma/client";
import Thinking from "./thinking";

interface Props {
  projectId: string;
  activeFragment: Fragment | null;
  setActiveFragment: (fragment: Fragment | null) => void;
}
export const MessagesContainer = ({
  projectId,
  activeFragment,
  setActiveFragment,
}: Props) => {
  const trpc = useTRPC();

  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: messages } = useSuspenseQuery(
    trpc.message.getMessages.queryOptions({
      projectId: projectId,
    }),
  );

  useEffect(() => {
    const lastMessage = messages.findLast((msg) => {
      return msg.role === "Assistant";
    });

    if (lastMessage && lastMessage.fragment) {
      setActiveFragment(lastMessage.fragment);
    }
  }, [messages, setActiveFragment]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages.length]);

  const lastMessage = messages.length > 0 && messages[messages.length - 1];
  let lastUserMessage;
  if (lastMessage) {
    if (lastMessage.role === "User") {
      lastUserMessage = true;
    } else {
      lastUserMessage = false;
    }
  }

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
              isActiveFragment={activeFragment?.id === message.fragment?.id}
              type={message.type}
              onFragmentClick={() => setActiveFragment(message.fragment)}
            />
          ))}
        </div>
        {lastUserMessage ? <Thinking /> : null}
        <div ref={bottomRef} />
      </div>
      <MessageForm projectId={projectId} />
    </div>
  );
};
