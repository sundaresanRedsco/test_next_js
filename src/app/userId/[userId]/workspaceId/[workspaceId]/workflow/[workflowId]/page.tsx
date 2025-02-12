import FlowPage from "@/app/apiflow_Pages/pages/Workflow/flowPage";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  return (
    <div>
      <FlowPage />
    </div>
  );
}
