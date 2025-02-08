import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid, Stack, useTheme } from "@mui/material";
import {
  SecondaryTextTypography,
  TeritaryTextTypography,
} from "@/app/Styles/signInUp";
import { useState } from "react";
import GBadge from "@/app/ApiFlowComponents/Global/GBadge";
import { InfoNew, SettingNew } from "@/app/Assests/icons";
import WorkspaceSelection from "./workspaceSideComponents/workspaceSelection";
import { RootStateType } from "@/app/Redux/store";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import {
  GetGroupsByWorkspaceIdSolrOffset,
  projectApiReducer,
  setCurrentProject,
  setCurrentProjectDetails,
} from "@/app/Redux/apiManagement/projectApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { CommonReducer, setCurrentTreeActive } from "@/app/Redux/commonReducer";
import {
  updateProjectEndValue,
  GetProjectByWorkspaceIdSolrOffset,
  updateProjectStartValue,
  GetProjectById,
  GetAllStagesByProjectId,
  setCurrentEnvironment,
  environmentReducer,
  GetProjectsByGroupOffset,
} from "@/app/Redux/apiManagement/environmentReducer";
import { setCookies } from "@/app/Helpers/helpersFunctions";
import { setAddTabs, setTabs, tabsReducer } from "@/app/Redux/tabReducer";
import { FlowTree } from "./workspaceSideComponents/FlowTree";
import Endpoints from "./workspaceSideComponents/endpoints";
import { BottomBar } from "./BottomBar";
import { usePathname, useRouter } from "next/navigation";
import WorkspaceSettings from "./workspaceSideComponents/WorkspaceSettings";
import GlobalCircularLoader from "@/app/ApiFlowComponents/Global/GlobalCircularLoader";
import { getItems, removeItem, setItem } from "@/app/Services/localstorage";
import GSkeletonLoader from "@/app/ApiFlowComponents/Global/GSkeletonLoader";
import {
  clearFlowList,
  FlowReducer,
} from "@/app/Redux/apiManagement/flowReducer";
import {
  endpointReducer,
  resetCollOperTreeData,
} from "@/app/Redux/apiManagement/endpointReducer";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";
import SkeletonProjectContainer, {
  ProjectTreeSkeleton,
} from "./SkeletonProjectContainer";
import { queryClient } from "@/app/apiflow_Pages/layout/dashboardLayout";

export const accordionCollectionStyles = {
  elevation: 0,
  border: "none",
  borderBottom: "none",

  "&.MuiPaper-root::before": {
    display: "none",
  },
  "&.MuiPaper-root-MuiAccordion-root.Mui-expanded ": {
    marginBottom: "0",
  },
  color: "white",
  boxShadow: "none",
  marginTop: "-15px",
  margin: "0px",
};

const EnvironmentTree = ({ expanded, setExpanded }: any) => {
  const theme = useTheme(); // Access the current theme
  const dispatch = useDispatch<any>();
  const containerRef = React.useRef<any>(null);
  const router = useRouter();
  const pathname = usePathname();

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

  // const { getCollOperTreeLoading } = useSelector<
  //   RootStateType,
  //   endpointReducer
  // >((state) => state.apiManagement.apiFlowDesign);
  const { currentProject } = useSelector<RootStateType, projectApiReducer>(
    (state) => state.apiManagement.apiProjects
  );

  const { currentWorkspace, getWsidLoading } = useSelector<
    RootStateType,
    workspaceReducer
  >((state) => state.apiManagement.workspace);

  const { tabs } = useSelector<RootStateType, tabsReducer>(
    (state) => state.tabs
  );
  const { currentTreeActive } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const [projectValues, setProjectValues] = useState<any[]>([]);
  const [searchVal, setSearchVal] = useState("");
  // const [currentPage, setCurrentPage] = useState<number>(7);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [nestedExpandedIndexes, setNestedExpandedIndexes] = useState<any>({
    flow: "",
    endpoint: "",
  });

  const fetchPageData = async (page: number) => {
    let requestData = {
      group_id: currentProject,
      startValue: projectStartValue,
      endValue: page,
    };

    dispatch(GetProjectsByGroupOffset(requestData))
      .unwrap()
      .then((projectRes: any) => {
        if (projectRes?.length > 0) {
          // setProjectValues((prevValues: any) => [...prevValues, ...projectRes?.projects]);
          // setProjectValues((prevValues: any) => {
          //   // Use a Set to avoid duplicates based on project_id
          //   const uniqueProjects = new Set([...prevValues, ...projectRes?.projects]);
          //   return Array.from(uniqueProjects)
          // });
          setProjectValues((prevValues: any) => {
            const newProjects = projectRes || [];
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

  const onSelectCurrentProject = (
    projectId: string,
    workspaceId: string,
    loadData?: boolean
  ) => {
    if (expanded == projectId) {
      setExpanded("");
      // setItem(`/first/${userProfile?.user?.user_id}`, "");
      return;
    }
    // Set the WSID in cookies and session storage (if needed)
    // if (tabs?.includes("pro_" + projectId)) {
    //   return;
    // }

    // const filteredTabs = tabs.filter((tab: any) => {
    //   // Check if the tab starts with "pro_"
    //   return !tab.startsWith("pro_");
    // });
    if (!loadData) {
      setNestedExpandedIndexes({
        flow: "",
        endpoint: "",
      });
    }
    if (projectId && workspaceId) {
      dispatch(
        GetProjectById({ project_id: projectId, workspace_id: workspaceId })
      )
        .unwrap()
        .then((res: any) => {});
    }

    // const projecTab = "pro_" + projectId;
    // const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/projects/${projectId}?tabs=${projecTab}`;
    // const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}?tabs=${projecTab}`;

    //encrypt projectId

    setCookies(
      process.env.NEXT_PUBLIC_COOKIE_PROJECTID || "",
      projectId,
      userProfile?.user?.expiration_time
    );

    // let tempArr = [projecTab, ...filteredTabs];
    dispatch(setCurrentTreeActive(projectId));
    dispatch(setCurrentEnvironment(projectId));
    // dispatch(setTabs(tempArr));
    dispatch(GetAllStagesByProjectId(projectId));

    // Update the browser's URL without reloading the page
    // window.history.pushState({}, "", newUrl);
    setExpanded(projectId);
    setItem(`/first/${userProfile?.user?.user_id}`, projectId);
    // Optional: Trigger any additional side effects or state updates here
  };

  // const handleAccordionChange =
  //   (panel: number) => (event: any, isExpanded: boolean) => {
  //     setExpanded(isExpanded ? panel : false); // Allow only one main accordion open
  //   };

  const handleNestedAccordionChange = (accordionKey: any, parentId: any) => {
    if (nestedExpandedIndexes[accordionKey] == parentId) {
      setNestedExpandedIndexes((prevState: any) => ({
        ...prevState,
        [accordionKey]: "",
      }));
      setItem(`/nested/${userProfile?.user?.user_id}`, {
        ...nestedExpandedIndexes,
        [accordionKey]: "",
      });
    } else {
      setNestedExpandedIndexes((prevState: any) => ({
        ...prevState,
        [accordionKey]: parentId,
      }));
      setItem(`/nested/${userProfile?.user?.user_id}`, {
        ...nestedExpandedIndexes,
        [accordionKey]: parentId,
      });
    }
  };

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (currentProject) fetchPageData(projectEndValue);
  }, [projectEndValue, searchVal, currentProject]);
  const { setIsPageLoading } = useGlobalStore();

  const handleOpenMainMenu = async () => {
    const data = await getItems(`/first/${userProfile?.user?.user_id}`);
    setExpanded(data ? data : "");

    const nestedcookies = await getItems(
      `/nested/${userProfile?.user?.user_id}`
    );
    if (data) {
      setNestedExpandedIndexes(nestedcookies ? nestedcookies : {});
      onSelectCurrentProject(data, pathname.split("/")[4], true);

      if (pathname.includes("/workflow") && !pathname.split("/")[6]) {
        await dispatch(setCurrentTreeActive(data + "_workflow"));
      } else if (pathname.includes("/workflow") && pathname.split("/")[6]) {
        await dispatch(setCurrentTreeActive(pathname.split("/")[6]));
      } else {
        await dispatch(setCurrentTreeActive(data));
      }
    }
  };

  React.useEffect(() => {
    if (!expanded && userProfile?.user?.user_id) {
      handleOpenMainMenu();
    }
  }, [getProjectWsidLoading, pathname, userProfile?.user?.user_id]);
  const workflowCollapse =
    nestedExpandedIndexes.flow &&
    nestedExpandedIndexes.flow.replace("_workflow", "");
  const endpointCollapse =
    nestedExpandedIndexes.endpoint &&
    nestedExpandedIndexes.endpoint.replace("_endpoints", "");

  const refreshDatas = async () => {
    if (nestedExpandedIndexes.flow == currentTreeActive) {
      await dispatch(clearFlowList([]));
      await queryClient.invalidateQueries({
        queryKey: ["getFlowTree"],
      });
    } else if (nestedExpandedIndexes.endpoint == currentTreeActive) {
      await dispatch(resetCollOperTreeData([]));
      await queryClient.invalidateQueries({
        queryKey: ["getEndpointsTree"],
      });
    }
  };

  React.useEffect(() => {
    if (
      pathname.includes("/environment") ||
      pathname.includes("/workflow") ||
      pathname.split("/")[6]
    )
      refreshDatas();
  }, [expanded, nestedExpandedIndexes.flow, nestedExpandedIndexes.endpoint]);

  return (
    <>
      {getProjectWsidLoading ? (
        <ProjectTreeSkeleton />
      ) : enviProjectsListSolrOffset.length > 0 ? (
        enviProjectsListSolrOffset.map((env: any, index: any) => (
          <Accordion
            key={index}
            sx={{
              background: theme.palette.sidebarMainBackground.main,
              color: "white",
              boxShadow: "none",
              "&::before": {
                display: "none",
              },
              margin: "0px !important",
            }}
            expanded={expanded === env.project_id}
          >
            <AccordionSummary
              onClick={() => {
                if (!pathname.includes("/environment")) {
                  setIsPageLoading(true);
                }

                onSelectCurrentProject(env.project_id, env.workspace_id);
                router.push(
                  `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/environment`
                );
              }}
              sx={{
                minHeight: "34px",
                background:
                  currentTreeActive === env.project_id && !getProjectWsidLoading
                    ? "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)"
                    : theme.palette.sidebarMainBackground.main,
                color:
                  currentTreeActive === env.project_id
                    ? "#FFFFFF"
                    : "#FFFFFF80",
                "&.Mui-expanded": {
                  minHeight: "34px",
                },
                "& .MuiAccordionSummary-content": {
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiAccordionSummary-content.Mui-expanded": {
                  margin: "0px",
                },
                "&:hover": getProjectWsidLoading
                  ? {}
                  : {
                      background:
                        "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)", // Same for selected
                      color: "#FFFFFF", // Change text color on hover
                    },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                <ExpandMoreIcon
                  sx={{
                    transform:
                      expanded === env.project_id
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                    transition: "transform 0.3s",
                    color:
                      expanded === env.project_id ? "#FFFFFF" : "#FFFFFF80",
                    fontSize: "23px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <TeritaryTextTypography
                    style={{
                      color:
                        expanded === env.project_id ? "#FFFFFF" : "#FFFFFF80",
                      fontSize: "15px",
                      maxWidth: "140px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {env.name}
                  </TeritaryTextTypography>
                  {/* {nestedAccordion?.badge === "true" && ( */}
                  {/* //*Make the value zero */}
                  <GBadge
                    badgeContent={"0"}
                    color="#F68E1E"
                    iconRight={"10px"}
                  />
                  {/* )} */}
                </div>
              </Box>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                width: "100%",
                "&.MuiAccordionDetails-root": {
                  padding: "0px !important",
                },
                "& .MuiButtonBase-root": {
                  paddingLeft: getProjectWsidLoading ? 0 : 4,
                  paddingRight: 0,
                },
              }}
            >
              <Accordion
                sx={{
                  background: theme.palette.sidebarMainBackground.main,
                  color: "white",
                  boxShadow: "none",
                  // marginTop: "10px",
                  margin: "0px !important",
                }}
                expanded={workflowCollapse == env.project_id}
                onChange={() => {
                  router.push(
                    `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/workflow`
                  );
                  handleNestedAccordionChange(
                    "flow",
                    env.project_id + "_workflow"
                  );
                  if (!pathname.includes("/workflow")) {
                    setIsPageLoading(true);
                  }
                  dispatch(setCurrentTreeActive(env.project_id + "_workflow"));
                }}
              >
                <AccordionSummary
                  sx={{
                    background:
                      currentTreeActive === env.project_id + "_workflow" &&
                      !getProjectWsidLoading
                        ? "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)"
                        : theme.palette.sidebarMainBackground.main,
                    color:
                      currentTreeActive === env.project_id + "_workflow"
                        ? "#FFFFFF"
                        : "#FFFFFF80",
                    minHeight: "34px",
                    "&.Mui-expanded": {
                      minHeight: "34px",
                      // marginTop: "10px",
                    },
                    "& .MuiAccordionSummary-content": {
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                    },
                    "& .MuiAccordionSummary-content.Mui-expanded": {
                      margin: "0px",
                    },
                    "&:hover": getProjectWsidLoading
                      ? {}
                      : {
                          background:
                            "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)", // Same for selected
                          color: "#FFFFFF", // Change text color on hover
                        },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      margin: 0,
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    {/* {getProjectWsidLoading && (
                    <GlobalCircularLoader open={getProjectWsidLoading} />
                  )} */}

                    <ExpandMoreIcon
                      sx={{
                        transform:
                          workflowCollapse == env.project_id
                            ? "rotate(0deg)"
                            : "rotate(-90deg)",
                        transition: "transform 0.3s",
                        color:
                          workflowCollapse == env.project_id
                            ? "#FFFFFF"
                            : "#FFFFFF80",
                        fontSize: "20px",
                      }}
                    />

                    <div
                      className="d-flex"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TeritaryTextTypography
                        style={{
                          color:
                            workflowCollapse == env.project_id
                              ? "#FFFFFF"
                              : "#FFFFFF80",
                          fontSize: "13px",
                          cursor: "pointer",
                        }}
                      >
                        WorkFlows
                      </TeritaryTextTypography>
                      {/* {nestedAccordion?.badge === "true" && ( */}
                      <GBadge
                        badgeContent={"0"}
                        color="#FD0101"
                        iconRight="15px"
                      />
                      {/* )} */}
                    </div>
                  </Box>
                </AccordionSummary>

                <FlowTree nestedExpandedIndexes={nestedExpandedIndexes} />
              </Accordion>

              <Accordion
                sx={{
                  background: theme.palette.sidebarMainBackground.main,
                  color: "white",
                  boxShadow: "none",
                  // marginTop: "10px",
                  margin: "0px !important",
                }}
                expanded={endpointCollapse == env.project_id}
                onChange={() => {
                  handleNestedAccordionChange(
                    "endpoint",
                    env.project_id + "_endpoints"
                  );
                  dispatch(setCurrentTreeActive(env.project_id + "_endpoints"));
                }}
              >
                <AccordionSummary
                  sx={{
                    background:
                      currentTreeActive === env.project_id + "_endpoints"
                        ? "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)"
                        : theme.palette.sidebarMainBackground.main,
                    color:
                      currentTreeActive === env.project_id + "_endpoints"
                        ? "#FFFFFF"
                        : "#FFFFFF80",

                    minHeight: "34px",
                    "&.Mui-expanded": {
                      minHeight: "34px",
                      // marginTop: "10px",
                    },
                    "& .MuiAccordionSummary-content": {
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                    },
                    "& .MuiAccordionSummary-content.Mui-expanded": {
                      margin: "0px",
                    },
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)", // Same for selected
                      color: "#FFFFFF", // Change text color on hover
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      margin: 0,
                      width: "100%",
                    }}
                  >
                    <ExpandMoreIcon
                      sx={{
                        transform:
                          endpointCollapse == env.project_id
                            ? "rotate(0deg)"
                            : "rotate(-90deg)",
                        transition: "transform 0.3s",
                        color:
                          endpointCollapse == env.project_id
                            ? "#FFFFFF"
                            : "#FFFFFF80",
                        fontSize: "20px",
                      }}
                    />
                    <div
                      className="d-flex"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TeritaryTextTypography
                        style={{
                          color:
                            endpointCollapse == env.project_id
                              ? "#FFFFFF"
                              : "#FFFFFF80",
                          fontSize: "13px",
                        }}
                      >
                        Endpoints
                      </TeritaryTextTypography>
                      {/* {nestedAccordion?.badge === "true" && ( */}
                      {/* //*Make the value zero */}
                      <GBadge
                        badgeContent={"0"}
                        color="#F7BD2B"
                        iconRight="15px"
                      />
                      {/* )} */}
                    </div>
                  </Box>
                </AccordionSummary>
                <Endpoints nestedExpandedIndexes={nestedExpandedIndexes} />
              </Accordion>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Box
          sx={{
            padding: "20px 10px 10px 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TeritaryTextTypography sx={{ color: "gray", fontSize: "12px" }}>
            No projects to show
          </TeritaryTextTypography>
        </Box>
      )}

      {/* {getProjectWsidLoading && (
        <Box sx={{ position: "relative" }}>
          <GlobalCircularLoader open={true} noBackDrop />
        </Box>
      )} */}
    </>
  );
};

const ProjectTree = () => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { setIsPageLoading } = useGlobalStore();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // Only one index
  const pathname = usePathname();
  const [selectedLink, setSelectedLink] = useState<any>("1");

  const { currentTreeActive, userProfile } = useSelector<
    RootStateType,
    CommonReducer
  >((state) => state.common);

  const { currentWorkspace, getWsidLoading } = useSelector<
    RootStateType,
    workspaceReducer
  >((state) => state.apiManagement.workspace);

  const { projectsList, getProjectLoading } = useSelector<
    RootStateType,
    projectApiReducer
  >((state) => state.apiManagement.apiProjects);

  const handleAccordionChange = (index: number, id: any) => {
    dispatch(resetCollOperTreeData([]));
    dispatch(clearFlowList([]));
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle between null and the index
    setSelectedLink(id);
    dispatch(
      setCurrentProjectDetails(projectsList?.find((x) => x.group_id == id))
    );
    dispatch(setCurrentProject(id));
    dispatch(setCurrentTreeActive(id));
    setItem(
      `/main/${userProfile?.user?.user_id}`,
      expandedIndex == index ? null : index
    );
  };

  const fetchPageData = async (offsetVal: number) => {
    const data = {
      workspace_id: currentWorkspace?.id,
      // workspace_id: "3204d72de45844cab234cbe28e5a579d",
      start: offsetVal,
      end: 5,
      direction: "asc",
    };

    dispatch(GetGroupsByWorkspaceIdSolrOffset(data))
      .unwrap()
      .then((groupRes: any) => {
        if (groupRes?.length > 0) {
          // Handle success
        }
        console.log(groupRes, "groupRes");
      })
      .catch((error: any) => {
        console.log("ErrorWorkspace: ", error);
      });
  };

  React.useEffect(() => {
    if (currentWorkspace) {
      fetchPageData(1);
    }
  }, [currentWorkspace]);
  const handleOpenMainMenu = async () => {
    const cookies = await getItems(`/main/${userProfile?.user?.user_id}`);
    setExpandedIndex(cookies);
    const id = await projectsList[cookies]?.group_id;
    setSelectedLink(id);
    await dispatch(
      setCurrentProjectDetails(projectsList?.find((x) => x.group_id == id))
    );
    await dispatch(setCurrentProject(id));
    if (pathname.includes("/project") && id) {
      dispatch(setCurrentTreeActive(id));
    }
  };

  React.useEffect(() => {
    handleOpenMainMenu();
  }, [pathname, getProjectLoading]);
  const [expanded, setExpanded] = useState<string>("");

  React.useEffect(() => {
    if (!expandedIndex) {
      setExpanded("");
    }
  }, [expandedIndex]);

  return (
    <>
      {getProjectLoading ? (
        <SkeletonProjectContainer />
      ) : (
        projectsList?.map((accordion, index) => (
          <div key={index}>
            <Accordion
              sx={accordionCollectionStyles}
              expanded={expandedIndex === index} // Only one can be open
              onChange={() => {
                handleAccordionChange(index, accordion?.group_id);
                if (!pathname.includes("/project")) {
                  setIsPageLoading(true);
                }
                router.push(
                  `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/project`
                );
                removeItem(`/first/${userProfile?.user?.user_id}`);
              }}
            >
              <AccordionSummary
                sx={{
                  "&:hover": getProjectLoading
                    ? {}
                    : {
                        background:
                          "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)", // Same for selected
                        color: "#FFFFFF", // Change text color on hover
                      },

                  background:
                    currentTreeActive === accordion?.group_id &&
                    !getProjectLoading
                      ? "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)"
                      : theme.palette.sidebarMainBackground.main,
                  color:
                    currentTreeActive === accordion?.group_id
                      ? "#FFFFFF"
                      : "#FFFFFF80",
                  padding: "0px 10px",
                  alignItems: "center",
                  height: "45px",
                  "&.Mui-expanded": {
                    minHeight: "34px",
                    // marginTop: "10px",
                  },
                  "& .MuiAccordionSummary-content": {
                    margin: "0",
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: "0px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    margin: "0px 0px",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      transform:
                        expandedIndex === index
                          ? "rotate(0deg)"
                          : "rotate(-90deg)",
                      transition: "transform 0.3s",
                      // marginRight: "10px",
                      color:
                        accordion?.group_id === selectedLink
                          ? "#FFFFFF"
                          : "#FFFFFF80",
                      fontSize: "25px",
                    }}
                  />
                  <SecondaryTextTypography
                    style={{
                      color:
                        accordion?.group_id === selectedLink
                          ? "#FFFFFF"
                          : "#FFFFFF80",
                      fontSize: "18px",
                      maxWidth: "170px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {`${accordion.name}`}
                  </SecondaryTextTypography>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: theme.palette.sidebarMainBackground.main,
                  width: "100%",
                  "&.MuiAccordionDetails-root": {
                    padding: "0px !important",
                  },
                  "& .MuiButtonBase-root": {
                    paddingLeft: 2,
                  },
                  "& .MuiPaper-root": {
                    margin: 0,
                    position: "relative",
                  },
                }}
              >
                <EnvironmentTree
                  expanded={expanded}
                  setExpanded={setExpanded}
                />
              </AccordionDetails>
            </Accordion>
            <hr
              style={{
                color: "white",
                border: "-10px solid white",
                margin: "10px",
              }}
            />
          </div>
        ))
      )}
      {/* {getProjectLoading && (
        <Box sx={{ position: "relative" }}>
          <GlobalCircularLoader open={true} noBackDrop />
        </Box>
      )} */}
    </>
  );
};

export default function ProjectsComponet() {
  const [selectedLink, setSelectedLink] = useState<any>("workspace");
  const { maninContainer, userProfile } = useSelector<
    RootStateType,
    CommonReducer
  >((state) => state.common);
  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const router = useRouter();
  const pathname = usePathname();
  const { setIsPageLoading } = useGlobalStore();

  const newUrl = `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/settings/overview`;
  const handleSelectedTeam = () => {
    //encrypt wsid
    if (newUrl) {
      setIsPageLoading(true);
      router.push(newUrl);
    }
    setSelectedLink("workspace_settings");
  };

  React.useEffect(() => {
    const activePath = pathname.match(
      /^\/userId\/[a-fA-F0-9]+\/workspaceId\/[a-fA-F0-9]+\/settings(\/.*)?$/
    );

    if (activePath) {
      setSelectedLink("workspace_settings");
    }
  }, [pathname]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      {selectedLink === "workspace" && (
        <>
          <WorkspaceSelection />
          <Box
            sx={{
              paddingTop: { xs: "5px", md: "10px", lg: "15px" }, // Adjust padding for different screen sizes
              height: "100%", // Responsive height
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: { xs: "1px", md: "3px" }, // Wider scrollbar on larger screens
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f6f9ff",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#f6f9ff",
              },
            }}
          >
            <ProjectTree />
            <SecondaryTextTypography
              style={{
                color: "#7A43FE",
                fontSize: "0.8rem",
                marginTop: "1rem",
                // marginLeft: "10px",
                cursor: "pointer",
                padding: "0px 10px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              See all Projects
            </SecondaryTextTypography>
          </Box>

          <BottomBar
            title={"Workspace Settings"}
            onClickHandler={() => {
              handleSelectedTeam();
            }}
          />
        </>
      )}
      {selectedLink === "workspace_settings" && (
        <>
          <WorkspaceSettings />
        </>
      )}
    </Box>
  );
}
