import { Fragment } from "@/app/generated/prisma/client";
import { MessageRole, MessageType } from "@/app/generated/prisma/enums";
import { Card } from "./card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  ChevronRightIcon,
  Code2Icon,
  MoveRight,
  PanelRight,
} from "lucide-react";

interface MessageCardProps {
  content: string;
  role: MessageRole;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
  type: MessageType;
}

interface UserMessageProps {
  content: string;
}

const UserMessageCard = ({ content }: UserMessageProps) => {
  return (
    <div className="self-end max-w-[50%] wrap-break-word my-5">
      <Card className="p-2 bg-gray-300 "> {content}</Card>
    </div>
  );
};

interface AssistantMessageProps {
  content: string;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
  type: MessageType;
}

const AssistantMessageCard = ({
  content,
  createdAt,
  type,
}: AssistantMessageProps) => {
  return (
    <div className="group flex flex-col w-[80%] wrap-break-word mb-2">
      <div className="flex mb-2 h-4 items-center gap-1">
        <Image src="/logo.png" alt="Luma" height={20} width={20} />
        <span className="font-medium ">Luma</span>
        <span className="text-sm opacity-0 transition-opacity group-hover:opacity-100">
          {format(createdAt, "hh:mm:a-dd/MM/yyyy")}
        </span>
      </div>
      <Card
        className={cn(
          "py-2 bg-gray-200 px-1 ml-5",
          type === "Error" && "text-red-500"
        )}
      >
        {content}
      </Card>
    </div>
  );
};

interface FragmentCardProps {
  fragment: Fragment;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
}

const FragmentCard = ({
  fragment,
  isActiveFragment,
  onFragmentClick,
}: FragmentCardProps) => {
  return (
    <button
      className={cn(
        "ml-5 w-fit flex items-center gap-3 p-4 border bg-muted rounded-lg",
        isActiveFragment &&
          "bg-primary text-primary-foreground border-primary hover:bg-primary-foreground"
      )}
    >
      <Code2Icon></Code2Icon>
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">{fragment.title}</span>
        <span className="text-xs text-muted-foreground">Preview</span>
      </div>

      <ChevronRightIcon />
    </button>
  );
};

const MessageCard = ({
  content,
  role,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
  type,
}: MessageCardProps) => {
  if (role === "Assistant") {
    return (
      <>
        <AssistantMessageCard
          content={content}
          type={type}
          fragment={fragment}
          createdAt={createdAt}
          isActiveFragment={isActiveFragment}
          onFragmentClick={onFragmentClick}
        />
        {fragment && (
          <FragmentCard
            fragment={fragment}
            isActiveFragment={isActiveFragment}
            onFragmentClick={onFragmentClick}
          />
        )}
      </>
    );
  }

  return <UserMessageCard content={content} />;
};

export default MessageCard;
