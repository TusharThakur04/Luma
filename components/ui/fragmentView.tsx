import { Fragment } from "@/app/generated/prisma/client";
import CodeView from "./codeView";

interface FragmentViewProps {
  fragment: Fragment;
  fragmentOption: string;
}

const FragmentView = ({ fragment, fragmentOption }: FragmentViewProps) => {
  return fragmentOption === "Page View" ? (
    <div className="bg-gray-400 h-full">
      <iframe className="h-full w-full" src={fragment.sandboxURL} />
    </div>
  ) : (
    <CodeView />
  );
};

export default FragmentView;
