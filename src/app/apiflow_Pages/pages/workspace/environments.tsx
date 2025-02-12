"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../../Redux/permissionReducer/permissionReducer";

import WorkspaceEnvironments from "../../workspace/settings/WorkspaceEnvironments";

export default function Environments(props: any) {
  return <WorkspaceEnvironments />;
}
