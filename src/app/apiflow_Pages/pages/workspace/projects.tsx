"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPermissionState } from "../../../Redux/permissionReducer/permissionReducer";
import WorkspaceProjects from "../../workspace/settings/WorkspaceProjects";

// import dynamic from "next/dynamic";
// import GlobalLoader from "@/app/Components/Global/GlobalLoader";

// const WorkspaceProjects = dynamic(
//   () => import("../../workspace/settings/WorkspaceProjects"),
//   {
//     loading: () => <GlobalLoader />,
//   }
// );

export default function Projects(props: any) {
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

  return <WorkspaceProjects />;
}
