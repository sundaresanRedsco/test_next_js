import WorkflowHomePage from "@/app/apiflow_Pages/WorkflowHomePage";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  return (
    <div>
      <WorkflowHomePage />
    </div>
  );
}
