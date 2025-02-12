"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../../Redux/permissionReducer/permissionReducer";

import OverView from "../../workspace/settings/Overview";

export default function OverviewSettings(props: any) {
  return <OverView />;
}
