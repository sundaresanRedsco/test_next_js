// import ProjectOverview from "@/app/apiflow_Pages/pages/Projects/ProjectOverview";
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
import ProjectHomePage from "@/app/apiflow_Pages/projects/ProjectHomePage";
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

export default function Home(context: { searchParams: { tabs?: string } }) {
  const dispatch = useDispatch<any>();

  const { currentWorkspace, totalCount } = useSelector<
    RootStateType,
    workspaceReducer
  >((state) => state.apiManagement.workspace);

  const { currentProjectDetails, currentProject } = useSelector<
    RootStateType,
    projectApiReducer
  >((state) => state.apiManagement.apiProjects);

  const { currentEnvironment } = useSelector<RootStateType, environmentReducer>(
    (state) => state.apiManagement.environment
  );

  const [projectData, setProjectData] = useState([
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

  const fetchEnvironmentCount = () => {
    let data = {
      workspace_id: currentWorkspace?.id,
      group_id: currentProject,
    };
    dispatch(GetProjectCounts(data))
      .unwrap()
      .then((res: any) => {
        setProjectData((prev) =>
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

        setProjectData((prev) =>
          prev.map((item) => {
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

  const fetchEndpointCount = () => {
    let data = {
      project_id: currentEnvironment,
      workspace_id: currentWorkspace?.id,
      group_id: currentProject,
    };
    dispatch(GetEndpointCounts(data))
      .unwrap()
      .then((res: any) => {
        setProjectData((prev) =>
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
    fetchData();
    fetchEndpointCount();
    fetchEnvironmentCount();
    fetchEndpointEntityCountData();
  }, [totalCount]);

  return (
    <div>
      {/* <ProjectHomePage /> */}
      <TextTypography style={{ fontSize: "25px", marginBottom: "10px" }}>
        {currentProjectDetails?.name} Summary
      </TextTypography>
      <GlobalSummary
        summaryData={projectData}
        endpointIdentityCountData={endpointIdentityCountData}
      />
    </div>
  );
}
