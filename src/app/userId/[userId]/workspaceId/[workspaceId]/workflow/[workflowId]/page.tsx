import FlowPage from "@/app/apiflow_Pages/pages/Workflow/flowPage";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];

  return (
    <div>
      <FlowPage allowedTabs={allowedTabs} userPermissions={userPermissions} />
    </div>
  );
}
