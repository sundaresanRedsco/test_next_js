"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../../Redux/permissionReducer/permissionReducer";

import OperationsPage from "@/app/apiflow_Pages/OperationsPage/OperationPage";

export default function OverviewOperation(props: any) {
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

  return <OperationsPage />;
}
