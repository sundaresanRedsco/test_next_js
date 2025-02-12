"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../../Redux/permissionReducer/permissionReducer";

import OperationsPage from "@/app/apiflow_Pages/OperationsPage/OperationPage";

export default function OverviewOperation(props: any) {
  return <OperationsPage />;
}
