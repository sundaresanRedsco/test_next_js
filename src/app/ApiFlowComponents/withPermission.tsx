import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../Redux/store";
import { permissionReducer } from "../Redux/permissionReducer/permissionReducer";
import { hasPermission } from "../Redux/permissionReducer/permissionsUtils";

const withPermission = (
  WrappedComponent: any,
  moduleName: string,
  subModule: string,
  permission: string,
) => {
  return (props: any) => {
    const { permissions } = useSelector<RootStateType, permissionReducer>(
      (state) => state.permission,
    );

    const hasComPermission = hasPermission(
      permissions,
      moduleName,
      subModule,
      permission,
    );

    if (!hasComPermission) {
      return null; // or a fallback UI
    }

    return <WrappedComponent {...props} />;
  };
};

export default withPermission;
