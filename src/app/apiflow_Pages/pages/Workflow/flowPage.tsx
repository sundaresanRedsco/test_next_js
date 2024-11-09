"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../../Redux/permissionReducer/permissionReducer";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import GlobalLoader from "@/app/Components/Global/GlobalLoader";
import WorkFlowPage from "../../WorkflowPages/workFlowPage";

// const WorkflowDesigner = dynamic(
//   () => import("@/app/apiflow_Pages/WorkflowPages/workFlowPage"),
//   {
//     loading: () => <GlobalLoader />,
//   }
// );

export default function FlowPage(props: any) {
  const { allowedTabs, userPermissions } = props;

  const location = usePathname();

  const locationVal = location.split("/");
  console.log(locationVal, "locationValOper");
  let flowId = locationVal[6];

  const isMounted = useRef(true);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    isMounted.current = true;

    dispatch(setPermissionState(userPermissions));

    return () => {
      isMounted.current = false;
    };
  }, [userPermissions]);

  return <WorkFlowPage apiFlow_Id={flowId} recentlyModifiedProp={false} />;
}
