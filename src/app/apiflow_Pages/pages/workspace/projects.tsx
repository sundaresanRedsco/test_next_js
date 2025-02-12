"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../../Redux/permissionReducer/permissionReducer";
import WorkspaceProjects from "../../workspace/settings/WorkspaceProjects";

export default function Projects(props: any) {
  return <WorkspaceProjects />;
}
