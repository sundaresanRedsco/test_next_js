"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../Redux/permissionReducer/permissionReducer";
import WorkspacePage from "../workspace/WorkspacePage";

export default function OverviewDashboard(props: any) {
  return <WorkspacePage />;
}
