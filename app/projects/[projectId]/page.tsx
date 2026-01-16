interface Props {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function Page(props: Props) {
  const { projectId } = await props.params;
  return <div>{projectId}</div>;
}
