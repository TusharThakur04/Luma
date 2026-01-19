import { Fragment } from "@/app/generated/prisma/client";

interface FragmentViewProps {
  fragment: Fragment;
}

const FragmentView = ({ fragment }: FragmentViewProps) => {
  return (
    <div className="bg-gray-400 h-full">
      <iframe className="h-full w-full" src={fragment.sandboxURL} />
    </div>
  );
};

export default FragmentView;
