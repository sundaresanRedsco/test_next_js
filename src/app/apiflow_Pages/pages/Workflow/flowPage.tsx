"use client";

import { usePathname } from "next/navigation";

import WorkFlowPage from "../../WorkflowPages/workFlowPage";

export default function FlowPage() {
  const location = usePathname();

  const locationVal = location.split("/");

  let flowId = locationVal[6];

  return <WorkFlowPage apiFlow_Id={flowId} recentlyModifiedProp={false} />;
}
