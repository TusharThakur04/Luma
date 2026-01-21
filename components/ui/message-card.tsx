import { Fragment } from "@/app/generated/prisma/client";
import { MessageRole, MessageType } from "@/app/generated/prisma/enums";
import { Card } from "./card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChevronRightIcon, Code2Icon } from "lucide-react";

interface MessageCardProps {
  content: string;
  role: MessageRole;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: () => void;
  type: MessageType;
  setFragmentOption: (view: string) => void;
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
  onFragmentClick: () => void;
  type: MessageType;
}

const AssistantMessageCard = ({
  content,
  createdAt,
  type,
}: AssistantMessageProps) => {
  console.log();
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
          type === "Error" && "text-red-500",
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
  onFragmentClick: () => void;
  setFragmentOption: (view: string) => void;
}

const FragmentCard = ({
  fragment,
  isActiveFragment,
  onFragmentClick,
  setFragmentOption,
}: FragmentCardProps) => {
  return (
    <button
      onClick={() => {
        onFragmentClick();
        setFragmentOption("Page View");
      }}
      className={cn(
        "ml-5 w-fit flex items-center gap-3 p-4  rounded-lg duration-300 hover:scale-97",
        isActiveFragment
          ? "bg-gray-900/95 text-primary-foreground border-primary hover:bg-gray-900/90  "
          : "border bg-muted ",
      )}
    >
      <Code2Icon></Code2Icon>
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">{fragment.title}</span>
        <span
          className={cn(
            "text-xs text-gray-300 ",
            isActiveFragment ? "text-gray-300" : "text-gray-900",
          )}
        >
          Preview
        </span>
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
  setFragmentOption,
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
            setFragmentOption={setFragmentOption}
          />
        )}
      </>
    );
  }

  return <UserMessageCard content={content} />;
};

export default MessageCard;
