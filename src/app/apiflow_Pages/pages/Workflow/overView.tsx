"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../../Redux/permissionReducer/permissionReducer";
import WorkspacePage from "../../workspace/WorkspacePage";
import DashboardLayout from "../../layout/dashboardLayout";

import dynamic from "next/dynamic";
import GlobalLoader from "@/app/apiflow_components/global/GlobalLoaderV1";

const WorkflowHomePage = dynamic(() => import("../../WorkflowHomePage"), {
  loading: () => <GlobalLoader />,
});

export default function Overview(props: any) {
  return <WorkflowHomePage />;
}
