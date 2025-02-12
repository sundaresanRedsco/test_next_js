import WorkspacePage from "@/app/apiflow_Pages/workspace/WorkspacePage";

export default function Home(context: { searchParams: { tabs?: string } }) {
  return (
    <div>
      <WorkspacePage />
    </div>
  );
}
