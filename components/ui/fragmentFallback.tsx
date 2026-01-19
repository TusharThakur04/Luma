"use client";

export default function FragmentFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="-translate-y-5 w-full max-w-md rounded-xl border bg-background shadow-sm">
        {/* Header */}
        <div className="border-b px-4 py-3">
          <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
        </div>

        {/* Body */}
        <div className="space-y-3 px-4 py-6">
          <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-4/6 rounded bg-gray-200 animate-pulse" />
        </div>

        {/* Footer message */}
        <div className="border-t px-4 py-3 text-center text-[1.05rem] text-muted-foreground">
          Your webpage will load here after building
        </div>
      </div>
    </div>
  );
}
