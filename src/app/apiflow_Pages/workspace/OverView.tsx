"use client";
import React, { useEffect, useState } from "react";

import { Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";

import {
  GetWorkspacesByUserId,
  workspaceReducer,
} from "../../Redux/apiManagement/workspaceReducer";
import GlobalSummary from "@/app/apiflow_components/global/GlobalSummary";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { projectApiReducer } from "@/app/Redux/apiManagement/projectApiReducer";
import {
  environmentReducer,
  GetProjectCounts,
} from "@/app/Redux/apiManagement/environmentReducer";
import {
  GetEndpointCountIdentity,
  GetEndpointCounts,
} from "@/app/Redux/apiManagement/endpointReducer";

const TextTypography = styled(Typography)`
  font-family: "FiraSans-regular" !important;
  color: ${({ theme }) => theme.palette.textPrimaryColor.main};
  font-size: 0.7rem;
  margin-top: 0.7rem;
`;

function OverView() {
  const dispatch = useDispatch<any>();

  const { currentWorkspace, totalCount } = useSelector<
    RootStateType,
    workspaceReducer
  >((state) => state.apiManagement.workspace);

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { currentProject } = useSelector<RootStateType, projectApiReducer>(
    (state) => state.apiManagement.apiProjects
  );

  const { currentEnvironment } = useSelector<RootStateType, environmentReducer>(
    (state) => state.apiManagement.environment
  );

  const [workspaceData, setWorkspaceData] = useState([
    { label: "Projects", value: 0 },
    { label: "Environments", value: 0 },
    { label: "Team Members", value: 0 },
    { label: "Total Endpoints", value: 0 },
  ]);

  const [endpointIdentityCountData, setEndpointIdentityCountData] = useState({
    private_count: 0,
    public_count: 0,
    orphan_count: 0,
    zombie_count: 0,
    shadow_count: 0,
  });

  const fetchProjectandTeamMemCount = () => {
    let data = {
      offset: 0,
      limit: totalCount,
    };

    dispatch(GetWorkspacesByUserId(data))
      .unwrap()
      .then((res: any) => {
        const filterByWsid = res?.workspaces?.find(
          (filterVal: any) => filterVal?.id === currentWorkspace?.id
        );

        setWorkspaceData((prev) =>
          prev.map((item) => {
            if (item.label === "Projects") {
              return { ...item, value: filterByWsid?.group_count || 0 };
            }
            if (item.label === "Team Members") {
              return { ...item, value: filterByWsid?.members_count || 0 };
            }
            return item;
          })
        );
      })
      .catch((error: any) => {
        console.log(error, "GETUSERBYUSERID");
      });
  };

  const fetchEnvironmentCount = () => {
    let data = {
      workspace_id: currentWorkspace?.id,
      group_id: currentProject || "",
    };
    dispatch(GetProjectCounts(data))
      .unwrap()
      .then((res: any) => {
        setWorkspaceData((prev) =>
          prev.map((item) => {
            if (item.label === "Environments") {
              return { ...item, value: res || 0 };
            }
            return item;
          })
        );
      })
      .catch((error: any) => {
        console.log(error, "Error");
      });
  };

  const fetchEndpointCount = () => {
    let data = {
      workspace_id: currentWorkspace?.id,
      project_id: currentEnvironment || "",
      group_id: currentProject || "",
    };
    dispatch(GetEndpointCounts(data))
      .unwrap()
      .then((res: any) => {
        setWorkspaceData((prev) =>
          prev.map((item) => {
            if (item.label === "Total Endpoints") {
              return { ...item, value: res?.active_Operationcount || 0 };
            }
            return item;
          })
        );
      })
      .catch((error: any) => {
        console.log(error, "Error");
      });
  };

  const fetchEndpointEntityCountData = () => {
    let data = {
      workspace_id: currentWorkspace?.id,
      project_id: currentEnvironment || "",
      group_id: currentProject || "",
    };

    dispatch(GetEndpointCountIdentity(data))
      .unwrap()
      .then((endpointIdentityRes: any) => {
        setEndpointIdentityCountData(endpointIdentityRes);
      })
      .catch((error: any) => {
        console.log(error, "EndpointIdentityError");
      });
  };

  useEffect(() => {
    let data = {
      offset: 0,
      limit: 1,
    };

    dispatch(GetWorkspacesByUserId(data))
      .unwrap()
      .then((res: any) => {})
      .catch((error: any) => {
        console.log(error, "GETUSERBYUSERID");
      });
  }, []);

  useEffect(() => {
    fetchProjectandTeamMemCount();
    fetchEndpointCount();
    fetchEnvironmentCount();
    fetchEndpointEntityCountData();
  }, [totalCount]);

  return (
    <div>
      <TextTypography style={{ fontSize: "1.7rem", margin: "1.5rem 0rem" }}>
        {(currentWorkspace?.name ?? "") + " Workspace Summary"}
      </TextTypography>
      <GlobalSummary
        summaryData={workspaceData}
        endpointIdentityCountData={endpointIdentityCountData}
      />
    </div>
  );
}

export default OverView;
