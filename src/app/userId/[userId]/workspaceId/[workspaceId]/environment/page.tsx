"use client";

import {
  GetEndpointCountIdentity,
  GetEndpointCounts,
} from "@/app/Redux/apiManagement/endpointReducer";
import {
  environmentReducer,
  GetProjectCounts,
} from "@/app/Redux/apiManagement/environmentReducer";
import { projectApiReducer } from "@/app/Redux/apiManagement/projectApiReducer";
import {
  GetWorkspacesByUserId,
  workspaceReducer,
} from "@/app/Redux/apiManagement/workspaceReducer";
import { RootStateType } from "@/app/Redux/store";
import EnvironmentHomePage from "@/app/apiflow_Pages/EnvironmentHomePage";
import GlobalSummary from "@/app/apiflow_components/global/GlobalSummary";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TextTypography = styled(Typography)`
  font-family: "FiraSans-regular" !important;
  color: ${({ theme }) => theme.palette.textPrimaryColor.main};
  font-size: 0.7rem;
  margin-top: 0.7rem;
`;

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  const dispatch = useDispatch<any>();

  const { currentWorkspace, totalCount } = useSelector<
    RootStateType,
    workspaceReducer
  >((state) => state.apiManagement.workspace);

  const { currentEnvironmentDetails, currentEnvironment } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);

  const { currentProject } = useSelector<RootStateType, projectApiReducer>(
    (state) => state.apiManagement.apiProjects
  );

  const [environmentData, setEnvironmentData] = useState([
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

  const fetchData = () => {
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

        setEnvironmentData((prev) =>
          prev.map((item) => {
            if (item.label === "Team Members") {
              return { ...item, value: filterByWsid?.members_count || 0 };
            }
            return item;
          })
        );
      })
      .catch((error: any) => {});
  };

  const fetchEndpointCount = () => {
    let data = {
      project_id: currentEnvironment,
      workspace_id: currentWorkspace?.id,
      group_id: currentProject,
    };
    dispatch(GetEndpointCounts(data))
      .unwrap()
      .then((res: any) => {
        setEnvironmentData((prev) =>
          prev.map((item) => {
            if (item.label === "Total Endpoints") {
              return { ...item, value: res?.active_Operationcount || 0 };
            }
            return item;
          })
        );
      })
      .catch((error: any) => {});
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
      .catch((error: any) => {});
  };

  useEffect(() => {
    let data = {
      offset: 0,
      limit: 1,
    };

    dispatch(GetWorkspacesByUserId(data))
      .unwrap()
      .then((res: any) => {})
      .catch((error: any) => {});
  }, []);

  useEffect(() => {
    fetchData();
    fetchEndpointCount();
    fetchEndpointEntityCountData();
  }, [totalCount]);

  return (
    <div>
      {/* <EnvironmentHomePage /> */}
      <TextTypography style={{ fontSize: "25px", marginBottom: "10px" }}>
        {currentEnvironmentDetails?.name ||
          currentEnvironmentDetails?.project_name}{" "}
        Summary
      </TextTypography>
      <GlobalSummary
        summaryData={environmentData}
        endpointIdentityCountData={endpointIdentityCountData}
      />
    </div>
  );
}
