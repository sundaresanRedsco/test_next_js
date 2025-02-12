"use client";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../Redux/permissionReducer/permissionReducer";
import WorkspacePage from "../workspace/WorkspacePage";
import DashboardLayout from "../layout/dashboardLayout";
import OverView from "../workspace/OverView";

export default function WorkspaceOverview(props: any) {
  return <OverView />;
}
