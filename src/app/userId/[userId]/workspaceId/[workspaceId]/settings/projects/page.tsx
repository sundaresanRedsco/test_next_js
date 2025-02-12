import WorkspaceProjects from "@/app/apiflow_Pages/workspace/settings/WorkspaceProjects";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  return (
    <div>
      <WorkspaceProjects />
    </div>
  );
}
