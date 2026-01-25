export default function ChatFallback() {
  return (
    <div className="flex flex-col">
      <UserMessageSkeleton />
      <UserMessageSkeleton />

      <AgentMessageSkeleton />
      <UserMessageSkeleton />
      <AgentMessageSkeleton />
    </div>
  );
}

const UserMessageSkeleton = () => {
  return (
    <div className="self-end max-w-[50%] my-5">
      <div className="p-2 h-20 bg-gray-300 rounded-lg animate-pulse">
        <div className="h-3 w-40 max-w-full bg-gray-400/70 rounded" />
        <div className="h-3 w-28 max-w-[80%] bg-gray-400/70 rounded mt-2" />
      </div>
    </div>
  );
};

const AgentMessageSkeleton = () => {
  return (
    <div className="self-start max-w-[50%] my-5">
      <div className="p-2 h-20 bg-neutral-500 rounded-lg animate-pulse">
        <div className="mb-4 h-3 max-w-[90%] w-32 bg-neutral-400 rounded" />
        <div className="h-3 max-w-[80%] w-22 bg-neutral-400 rounded" />
      </div>
    </div>
  );
};
