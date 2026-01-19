"use client";

export default function Thinking() {
  return (
    <div className="flex w-fit items-center gap-3 px-4 py-3 rounded-lg bg-muted/40 border border-border/50">
      <div className="relative flex h-8 w-8 items-center justify-center">
        <span
          className="absolute inset-0 rounded-full bg-linear-to-br from-yellow-400/50 to-orange-500/50
 animate-pulse"
        />
        <span className="relative h-3 w-3 rounded-full bg-primary" />
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium tracking-tight">
          Luma is making your webpage
        </span>
        <span className="inline-flex gap-1">
          <span className="animate-bounce">•</span>
          <span className="animate-bounce [animation-delay:150ms]">•</span>
          <span className="animate-bounce [animation-delay:300ms]">•</span>
        </span>
      </div>
    </div>
  );
}
