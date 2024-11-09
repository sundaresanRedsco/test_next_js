"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../../Redux/permissionReducer/permissionReducer";

import Channel from "@/app/apiflow_components/channels/channelpage";

export default function OverviewChannel(props: any) {
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

  return <Channel />;
}
