"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../../Redux/permissionReducer/permissionReducer";

import ProjectHomePage from "../../projects/ProjectHomePage";

export default function ProjectOverview(props: any) {
  return <ProjectHomePage />;
}
