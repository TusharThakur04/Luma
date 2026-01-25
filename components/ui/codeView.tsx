import { useState } from "react";
import { Fragment, Prisma } from "@/app/generated/prisma/client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CodeViewProps {
  fragment: Fragment;
}

const CodeView = ({ fragment }: CodeViewProps) => {
  const [open, setOpen] = useState(false);

  const filesObj = fragment.file as Prisma.JsonObject;
  const files = Object.keys(filesObj);

  const [selectedFile, setSelectedFile] = useState(files[0]);

  const code = filesObj[selectedFile] as string;

  return (
    <div className="flex flex-col h-full bg-gray-50 text-gray-800">
      <div className="relative border-b border-gray-200 px-3 py-2 bg-white">
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-fit items-center gap-1 px-1 py-1.5 rounded-md bg-white border border-gray-300 text-sm cursor-pointer
                 hover:bg-gray-200 transition"
        >
          <span className="truncate max-w-50">{selectedFile}</span>
          <span
            className={cn(
              "transition-transform duration-350 text-gray-500",
              open && "rotate-180",
            )}
          >
            <ChevronDown height={18} width={18} />
          </span>
        </div>

        {open && (
          <div
            className="absolute left-3 top-full mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-md z-50
                   animate-in fade-in zoom-in-95"
          >
            {files.map((file) => {
              const isActive = file === selectedFile;

              return (
                <div
                  key={file}
                  onClick={() => {
                    setSelectedFile(file);
                    setOpen(false);
                  }}
                  className={cn(
                    "px-3 py-2 text-sm cursor-pointer select-none",
                    "transition-colors",
                    "hover:bg-gray-100",
                    isActive
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-600",
                  )}
                >
                  {file}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <pre className="flex-1 overflow-auto p-4 text-sm leading-relaxed bg-gray-600 text-gray-200">
        <code className="whitespace-pre">{code}</code>
      </pre>
    </div>
  );
};

export default CodeView;
