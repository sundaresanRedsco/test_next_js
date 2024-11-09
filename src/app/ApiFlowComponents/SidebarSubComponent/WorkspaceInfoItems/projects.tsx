import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import theme from "../../../../Theme/theme";
import GInput from "../../Global/GInput";
import GDivider from "../../Global/GDivider";
import GButton from "../../Global/GButton";
import GAlertDetailBox from "../../Global/GAlertDetailBox";
import { useDispatch, useSelector } from "react-redux";
import {
  environmentReducer,
  GetAllStagesByProjectId,
  GetProjectById,
  GetProjectByWorkspaceIdSolrOffset,
  setCurrentEnvironment,
  updateProjectEndValue,
  updateProjectStartValue,
} from "../../../Redux/apiManagement/environmentReducer";
import { RootStateType } from "../../../Redux/store";
import { CommonReducer } from "../../../Redux/commonReducer";
import GlobalCircularLoader from "../../../Components/Global/GlobalCircularLoader";
import { setAddTabs, setTabs, tabsReducer } from "../../../Redux/tabReducer";
import { workspaceReducer } from "../../../Redux/apiManagement/workspaceReducer";
import {
  MODULES,
  PERMISSIONS,
  SUB_MODULES,
} from "../../../Constants/permissionConstants";
import { setCookies } from "@/app/Helpers/helpersFunctions";

const Projects = () => {
  const theme = useTheme(); // Access the current theme
  const dispatch = useDispatch<any>();
  const containerRef = useRef<any>(null);

  const { maninContainer, userProfile } = useSelector<
    RootStateType,
    CommonReducer
  >((state) => state.common);

  const {
    getProjectWsidLoading,
    currentEnvironment,
    enviProjectsListSolrOffset,
    projectStartValue,
    projectEndValue,
  } = useSelector<RootStateType, environmentReducer>(
    (state) => state.apiManagement.environment
  );

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  console.log("currentEnvironmentVal: ", currentEnvironment);

  const { tabs } = useSelector<RootStateType, tabsReducer>(
    (state) => state.tabs
  );

  const projectVal = [
    {
      name: "Dev-AWS",
      border: "#894B9E",
      color: "#975BA5",
    },
    {
      name: "Dev-GCP",
      border: "#2BBCD4",
      color: "#2BBCD4",
    },
  ];

  const [projectSearchClicked, setprojectSearchClicked] = useState(false);
  const [projectValues, setProjectValues] = useState<any[]>([]);
  const [searchVal, setSearchVal] = useState("");
  // const [currentPage, setCurrentPage] = useState<number>(7);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPageData = async (page: number) => {
    let requestData = {
      wsid: currentWorkspace?.id,
      sortByField: "name",
      sortByValue: searchVal?.trim() !== "" ? searchVal : "",
      sortDirection: "asc",
      startValue: projectStartValue,
      endValue: page,
    };

    console.log("RequestData: ", requestData);

    dispatch(GetProjectByWorkspaceIdSolrOffset(requestData))
      .unwrap()
      .then((projectRes: any) => {
        if (projectRes?.total_count > 0) {
          // setProjectValues((prevValues: any) => [...prevValues, ...projectRes?.projects]);
          // setProjectValues((prevValues: any) => {
          //   // Use a Set to avoid duplicates based on project_id
          //   const uniqueProjects = new Set([...prevValues, ...projectRes?.projects]);
          //   return Array.from(uniqueProjects)
          // });
          setProjectValues((prevValues: any) => {
            const newProjects = projectRes?.projects || [];
            const updatedValues = [...prevValues];

            // Add only new projects to the state
            newProjects.forEach((project: any) => {
              if (
                !prevValues.some(
                  (prevProject: any) =>
                    prevProject.project_id === project.project_id
                )
              ) {
                updatedValues.push(project);
              }
            });

            return updatedValues;
          });
        }
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        if (projectEndValue <= enviProjectsListSolrOffset?.length) {
          dispatch(updateProjectStartValue(projectStartValue + 8));
          dispatch(updateProjectEndValue(projectEndValue + 8));
        }
      }
    }
  };

  console.log(enviProjectsListSolrOffset, "enviProjectsListSolrOffsetsdsdsd");

  const onSelectCurrentProject = (projectId: string) => {
    // Set the WSID in cookies and session storage (if needed)
    if (tabs?.includes("pro_" + projectId)) {
      return;
    }

    const filteredTabs = tabs.filter((tab) => {
      // Check if the tab starts with "pro_"
      return !tab.startsWith("pro_");
    });

    console.log(projectId, "projectId");
    dispatch(GetProjectById(projectId))
      .unwrap()
      .then((res: any) => {});

    const projecTab = "pro_" + projectId;
    // const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/projects/${projectId}?tabs=${projecTab}`;
    const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}?tabs=${projecTab}`;

    //encrypt projectId

    setCookies(
      process.env.NEXT_PUBLIC_COOKIE_PROJECTID || "",
      projectId,
      userProfile?.user?.expiration_time
    );

    let tempArr = [projecTab, ...filteredTabs];

    dispatch(setCurrentEnvironment(projectId));
    dispatch(setTabs(tempArr));
    dispatch(GetAllStagesByProjectId(projectId));
    // Update the browser's URL without reloading the page
    window.history.pushState({}, "", newUrl);

    // Optional: Trigger any additional side effects or state updates here
  };

  console.log(tabs, "state.tabs");

  useEffect(() => {
    // const container = document.getElementById(maninContainer);
    const container = document.getElementById("scrollable-container");
    container?.addEventListener("scroll", handleScroll);
    setSearchVal("");

    return () => {
      container?.removeEventListener("scroll", handleScroll);
      setSearchVal("");
    };
    // }, [maninContainer]); // Include maninContainer as a dependency
  }, []);

  useEffect(() => {
    // fetchPageData(currentPage);
    fetchPageData(projectEndValue);
  }, [projectEndValue, searchVal, currentWorkspace]);

  console.log(
    projectValues,
    projectStartValue,
    projectEndValue,
    "projectValuesprojectValues"
  );

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Grid container>
        <Grid item xs={5}>
          <GInput
            className="projectsSearch"
            fullWidth
            variant="standard"
            value="Environments"
            fontSize={projectSearchClicked ? "" : "10px"}
            fontWeight={projectSearchClicked ? "" : 600}
            color={
              projectSearchClicked
                ? ""
                : `${theme.palette.v2SecondaryColor.main}`
            }
            // endIcon={
            //   <SearchV2Icon
            //     stroke={theme.palette.v2PrimaryColor.main}
            //     style={{ width: "8px", height: "8px", cursor: "pointer" }}
            //     onClick={() => setprojectSearchClicked((prev) => !prev)}
            //   />
            // }
            disableUnderline={!projectSearchClicked}
            disabledColor={`${theme.palette.v2SecondaryColor.main}`}
            disabled={!projectSearchClicked}
            helperText={true}
          />
        </Grid>
        <Grid item xs={7} sx={{ display: "flex", justifyContent: "end" }}>
          <Box>
            <GButton
              buttonType="Outlined"
              buttonShape="circular"
              label="Invite"
              padding="0px"
              minWidth="35px"
              // marginLeft="4px"
              disabled={currentEnvironment ? true : false}
              cursor={currentEnvironment ? "" : "pointer"}
              onClickHandler={() => {}}
            />
            <GButton
              buttonType="Outlined"
              buttonShape="circular"
              label="Import"
              padding="0px"
              minWidth="35px"
              marginLeft="3px"
              // onClickHandler={() => {
              //   dispatch(setAddTabs("import_project"));
              // }}
              module_name={MODULES.API_MANAGEMENT}
              sub_module={SUB_MODULES.IMPORTFROMAPIGATEWAY}
              action={PERMISSIONS.CREATE}
            />
            <GButton
              buttonType="Outlined"
              buttonShape="circular"
              label="New"
              padding="0px"
              minWidth="35px"
              marginLeft="3px"
              module_name={MODULES.API_MANAGEMENT}
              sub_module={SUB_MODULES.PROJECT}
              action={PERMISSIONS.CREATE}
              onClickHandler={() => {
                dispatch(setAddTabs("import_Environment"));
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <GDivider />
      <Box
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px 10px",
          position: "relative",
          maxHeight: "60px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "2px", // Adjust the width of the scrollbar
          },
        }}
      >
        {<GlobalCircularLoader open={getProjectWsidLoading} />}
        {enviProjectsListSolrOffset?.length === 0 ? (
          <GAlertDetailBox
            label={
              "DRAG AND DROP THE PROJECT EXPORTED FILE OR CLICK NEW/IMPORT BUTTON "
            }
          />
        ) : (
          <>
            {enviProjectsListSolrOffset
              // projectValues
              ?.map((val: any) => (
                <div id="scrollContainer" key={val?.id}>
                  <GButton
                    buttonShape="circular"
                    background={
                      currentEnvironment === val?.project_id
                        ? theme?.palette.v2PrimaryColor.main
                        : "transparent"
                    }
                    borderColor={theme?.palette.v2PrimaryColor.main}
                    color={
                      currentEnvironment === val?.project_id
                        ? "white" // or any other color for when the condition is true
                        : theme?.palette.v2PrimaryColor.main
                    }
                    label={val?.name}
                    padding="2px 4px"
                    minWidth="35px"
                    onClickHandler={() => {
                      onSelectCurrentProject(val?.project_id);
                    }}
                  />
                </div>
              ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Projects;
