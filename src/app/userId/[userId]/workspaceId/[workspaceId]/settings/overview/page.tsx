"use client";

import OverviewPageSkeleton from "@/app/apiflow_components/skeletons/WorkspaceSettings/OverviewPageSkeleton";
import OverviewSettings from "@/app/apiflow_Pages/pages/workspace/overwiewSettings";
import OverView from "@/app/apiflow_Pages/workspace/settings/Overview";
import dynamic from "next/dynamic";
import React from "react";

const OverviewPage = dynamic(
  () => import("@/app/apiflow_Pages/workspace/settings/Overview"),
  {
    ssr: false, // Optionally disable SSR if you don't need it during SSR
    loading: () => <OverviewPageSkeleton />,
  }
);

export default function Home(context: { searchParams: { tabs?: string } }) {
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];

  return (
    <div>
      <React.Suspense fallback={<OverviewPageSkeleton />}>
        <OverviewPage />
      </React.Suspense>
    </div>
  );
}
