// import ProjectOverview from "@/app/apiflow_Pages/pages/Projects/ProjectOverview";

import ProjectHomePage from "@/app/apiflow_Pages/projects/ProjectHomePage";

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  return (
    <div>
      <ProjectHomePage />
    </div>
  );
}
