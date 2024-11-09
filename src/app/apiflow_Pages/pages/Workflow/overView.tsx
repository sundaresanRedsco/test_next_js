"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../../Redux/permissionReducer/permissionReducer";
import WorkspacePage from "../../workspace/WorkspacePage";
import DashboardLayout from "../../layout/dashboardLayout";

import dynamic from "next/dynamic";
import GlobalLoader from "@/app/Components/Global/GlobalLoader";

const WorkflowHomePage = dynamic(() => import("../../WorkflowHomePage"), {
  // const WorkflowHomePage = dynamic(() => import("../Projects/ProjectSummaryPage"), {

  loading: () => <GlobalLoader />,
});

export default function Overview(props: any) {
  const { allowedTabs, userPermissions } = props;

  const isMounted = useRef(true);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    isMounted.current = true;

    dispatch(setPermissionState(userPermissions));

    return () => {
      isMounted.current = false;
    };
  }, [userPermissions]);

  return <WorkflowHomePage />;
}
