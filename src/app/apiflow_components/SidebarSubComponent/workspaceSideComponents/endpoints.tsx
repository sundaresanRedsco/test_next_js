import {
  environmentReducer,
  GetAllStagesByProjectId,
} from "@/app/Redux/apiManagement/environmentReducer";
import { RootStateType } from "@/app/Redux/store";
import { setAddTabs, setRemoveTabs, tabsReducer } from "@/app/Redux/tabReducer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid2,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  SecondaryTextTypography,
  TeritaryTextTypography,
} from "@/app/Styles/signInUp";
import { InfoNew } from "@/app/Assests/icons";
import {
  endpointReducer,
  GetMinimalCollectionOperationTree,
} from "@/app/Redux/apiManagement/endpointReducer";
import { usePathname, useRouter } from "next/navigation";
import { CommonReducer, setCurrentTreeActive } from "@/app/Redux/commonReducer";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { getItems, setItem } from "@/app/Services/localstorage";
import GSkeletonLoader from "@/app/apiflow_components/global/GSkeletonLoader";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";
import path from "path";
import { ProjectTreeSkeleton } from "../SkeletonProjectContainer";
import { useQuery } from "@tanstack/react-query";

const accordionCollectionStyles = {
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

const Endpoints = ({ nestedExpandedIndexes }: any) => {
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const containerRef = useRef<any>(null);
  const router = useRouter();

  const pathname = usePathname();

  const {
    getMinimalCollOperTreeLoading,
    collectionCount,
    getCollOperTreeData,
  } = useSelector<RootStateType, endpointReducer>(
    (state) => state.apiManagement.endpoint
  );

  const { currentEnvironment, currentStage } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);

  const { userProfile, currentTreeActive } = useSelector<
    RootStateType,
    CommonReducer
  >((state) => state.common);

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const { tabs } = useSelector<RootStateType, tabsReducer>(
    (state) => state.tabs
  );

  const iconStyle = {
    width: "13px",
    height: "13px",
  };

  const iconImageStyle = {
    width: "12px",
    height: "12px",
  };
  const [currentPage, setCurrentPage] = useState<any>({ start: 0, end: 5 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPageData = async (page: any) => {
    if (currentEnvironment && currentStage) {
      setIsLoading(true);
      let requestData = {
        project_id: currentEnvironment,
        stage_id: currentStage,
        offsetStart: page.start ? page.start : 0,
        offsetEnd: page.end ? page.end : 5,
      };
      try {
        const response = await dispatch(
          GetMinimalCollectionOperationTree(requestData)
        ).unwrap();
        if (response) {
          setIsLoading(false);
        }
        return response;
      } catch (error) {
        setIsLoading(false);
        return {};
      }
    }
  };
  const isFetchAllowed =
    pathname.includes("/environment") ||
    pathname.includes("/workflow") ||
    pathname.split("/")[6]
      ? true
      : false;
  useQuery({
    queryKey: ["getEndpointsTree"],
    queryFn: fetchPageData,
    enabled: isFetchAllowed,
  });
  const handleScroll = () => {
    if (containerRef.current) {
      const bottom = containerRef.current.getBoundingClientRect().bottom;
      if (bottom <= window.innerHeight && !isLoading) {
        setCurrentPage((prev: any) => ({
          start: prev.start + 5,
          end: prev.end + 5,
        }));
      } else {
        return;
      }
    }
  };

  const onSelectCurrentCollection = (collId: string) => {
    if (tabs.includes("Coll_" + collId)) {
      dispatch(setRemoveTabs("Coll_" + collId));
      return;
    }
    dispatch(setAddTabs("Coll_" + collId));
  };

  const onSelectCurrentOperation = (collId: string, operId: string) => {
    const collectionTab = "Operat_" + operId + "_" + collId;
    dispatch(setAddTabs(collectionTab));
  };
  useEffect(() => {
    if (
      currentEnvironment &&
      collectionCount >= currentPage.start &&
      currentStage &&
      isFetchAllowed
    ) {
      fetchPageData(currentPage);
    }
  }, [currentPage.start, currentPage.end, currentEnvironment, currentStage]);
  useEffect(() => {
    const conatiner = document.getElementById("envContainer");

    if (conatiner) {
      conatiner.addEventListener("scroll", handleScroll);
      return () => {
        conatiner.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  useEffect(() => {
    if (currentEnvironment) {
      dispatch(GetAllStagesByProjectId(currentEnvironment));
    }
  }, [currentEnvironment]);

  const [expandedIndexes, setExpandedIndexes] = useState<string[]>([]);

  const [selectedLink, setSelectedLink] = useState<any>("1");

  const handleAccordionChange = (index: number, id: any) => {
    dispatch(setCurrentTreeActive(id));
    setExpandedIndexes((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    setItem(
      `/nestedFirst/${userProfile?.user?.user_id}`,
      expandedIndexes.includes(id)
        ? expandedIndexes.filter((i) => i !== id)
        : [...expandedIndexes, id]
    );
  };
  const handleOpenMainMenu = async () => {
    const data = await getItems(`/nestedFirst/${userProfile?.user?.user_id}`);
    setExpandedIndexes(data ? data : []);
    if (pathname.split("/")[6]) {
      await dispatch(setCurrentTreeActive(pathname.split("/")[6]));
    }
  };

  useEffect(() => {
    if (pathname.includes("/workflow") || pathname.includes("/operations")) {
      handleOpenMainMenu();
    }
  }, []);

  const { setIsPageLoading } = useGlobalStore();
  useEffect(() => {
    if (nestedExpandedIndexes.endpoint == "") {
      setCurrentPage({ start: 0, end: 5 });
    }
  }, [nestedExpandedIndexes.endpoint]);
  const isHeightIncrease =
    !getMinimalCollOperTreeLoading &&
    !isLoading &&
    collectionCount > currentPage.start &&
    collectionCount > 4;
  return (
    <AccordionDetails
      id="envContainer"
      sx={{
        width: "100%",
        "& .MuiButtonBase-root": {
          paddingLeft: 6,
        },
        "&.MuiAccordionDetails-root": {
          padding: "0px !important",
        },
        maxHeight: "160px",
        overflowY: "auto",
      }}
    >
      {getMinimalCollOperTreeLoading && !isLoading ? (
        <ProjectTreeSkeleton isEndpoint={true} />
      ) : (
        getCollOperTreeData.map((col, index) => (
          <div key={col.id}>
            <Accordion
              sx={accordionCollectionStyles}
              expanded={expandedIndexes.includes(col.id)}
              onChange={() => {
                handleAccordionChange(index, col?.id);
              }}
            >
              <AccordionSummary
                sx={{
                  background:
                    currentTreeActive === col?.id
                      ? "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)"
                      : theme.palette.sidebarMainBackground.main,
                  color:
                    currentTreeActive === col?.id ? "#FFFFFF" : "#FFFFFF80",
                  minHeight: "34px",
                  overflowY: "auto",
                  overflowX: "hidden",

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
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)", // Same for selected
                    color: "#FFFFFF", // Change text color on hover
                  },
                }}
                onClick={() => {
                  if (
                    pathname !=
                    `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/collections/${col?.id}`
                  ) {
                    setIsPageLoading(true);
                  }

                  router.push(
                    `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/collections/${col?.id}`
                  );
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    margin: "0px 0px",
                    position: "relative",
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      transform: expandedIndexes.includes(col.id)
                        ? "rotate(0deg)"
                        : "rotate(-90deg)",
                      transition: "transform 0.3s",
                      color: expandedIndexes.includes(col.id)
                        ? "#FFFFFF"
                        : "#FFFFFF80",
                      fontSize: "18px",
                    }}
                  />
                  <TeritaryTextTypography
                    style={{
                      color: expandedIndexes.includes(col.id)
                        ? "#FFFFFF"
                        : "#FFFFFF80",
                      fontSize: "12px",
                      maxWidth: "170px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {col.name}
                  </TeritaryTextTypography>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: theme.palette.sidebarMainBackground.main,

                  width: "100%",
                  "&.MuiAccordionDetails-root": {
                    padding: "0px !important",
                    display: "flex",
                    flexDirection: "column",
                  },
                }}
              >
                {col.operations.map((op: any) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "7px",
                      paddingLeft: 8,
                      position: "relative",
                      gap: "5px",

                      background:
                        currentTreeActive === op?.id
                          ? "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)"
                          : theme.palette.sidebarMainBackground.main,
                      color:
                        currentTreeActive === op?.id ? "#FFFFFF" : "#FFFFFF80",
                    }}
                    onClick={() => {
                      if (
                        pathname !=
                        `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/operations/${op?.id}`
                      ) {
                        setIsPageLoading(true);
                      }
                      dispatch(setCurrentTreeActive(op?.id));
                      router.push(
                        `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/operations/${op?.id}`
                      );
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color:
                          currentTreeActive === op?.id
                            ? "#FFFFFF"
                            : "#FFFFFF80",
                      }}
                    >
                      <InfoNew />
                    </Box>

                    <TeritaryTextTypography
                      key={op.id}
                      style={{
                        color:
                          currentTreeActive === op?.id
                            ? "#FFFFFF"
                            : "#FFFFFF80",
                        fontSize: "10px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                      }}
                    >
                      {op.name}
                    </TeritaryTextTypography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          </div>
        ))
      )}

      {isLoading &&
        [1, 2, 3, 4].map((elem, index) => {
          return (
            <div
              key={index}
              style={{
                padding: "10px 0 10px 50px",
                position: "relative",
                marginBottom: 2,
              }}
            >
              <GSkeletonLoader
                secondary={true}
                open={true}
                width="60%"
                height="15px"
              />
            </div>
          );
        })}
      <div
        ref={containerRef}
        style={{ height: isHeightIncrease ? "50px" : 0 }}
      ></div>
    </AccordionDetails>
  );
};

export default Endpoints;
