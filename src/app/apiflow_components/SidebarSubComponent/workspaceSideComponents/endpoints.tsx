import {
  environmentReducer,
  GetAllStagesByProjectId,
} from "@/app/Redux/apiManagement/environmentReducer";
import {
  GetCollectionOperationTree,
  GetMinimalCollectionOperationTree,
} from "@/app/Redux/apiManagement/projectReducer";
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
import { endpointReducer } from "@/app/Redux/apiManagement/endpointReducer";
import { usePathname, useRouter } from "next/navigation";
import { CommonReducer, setCurrentTreeActive } from "@/app/Redux/commonReducer";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import GlobalCircularLoader from "@/app/ApiFlowComponents/Global/GlobalCircularLoader";
import { getItems, setItem } from "@/app/Services/localstorage";
import GSkeletonLoader from "@/app/ApiFlowComponents/Global/GSkeletonLoader";

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

const Endpoints = () => {
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const containerRef = useRef<any>(null);
  const router = useRouter();

  const pathname = usePathname();

  const { getMinimalCollOperTreeLoading } = useSelector<
    RootStateType,
    endpointReducer
  >((state) => state.apiManagement.endpoint);

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

  const [endpointSearchClicked, setEndpointSearchClicked] = useState(false);
  const [endpointVal, setEndpointVal] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [stateId, setStageId] = useState<string>("");
  const [collOperVal, setCollOperVal] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startVal, setStartVal] = useState<number>(0);
  const [endVal, setEndVal] = useState<number>(5);
  const [collOperTreeCount, setCollOperTreeCount] = useState(0);
  const [collOperDetails, setCollOperDetails] = useState<any[]>([]);
  console.log(collOperDetails, "collOperDetailssdsd");

  const [searchVal, setSearchVal] = useState("");

  const fetchPageData = async (page: number) => {
    if (currentEnvironment && currentStage) {
      setIsLoading(true);
      setEndVal((prevEnd: any) => prevEnd + 5);
      let requestData = {
        project_id: currentEnvironment,
        stage_id: currentStage,
        offsetStart: 0,
        offsetEnd: page,
      };
      dispatch(GetMinimalCollectionOperationTree(requestData))
        .unwrap()
        .then((res: any) => {
          console.log("treeRes: ", res);
          setCollOperTreeCount(res?.count);
          const filterStatusVal = res?.collections?.filter(
            (filterStatus: any) => filterStatus?.status === "ACTIVE"
          );
          console.log("GetOperationTreeRes: ", res?.collections);
          setCollOperDetails(res?.collections);
          setIsLoading(false);
        })
        .catch((error: any) => {
          console.log("Eror: ", error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const bottom = containerRef.current.getBoundingClientRect().bottom;
      if (bottom <= window.innerHeight) {
        setIsLoading(true);
        setCurrentPage((prev) => prev + 5);
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
    if (currentEnvironment && currentStage) {
      fetchPageData(currentPage);
    } else {
      setCollOperDetails([]);
      setCollOperTreeCount(0);
    }
  }, [currentPage, currentEnvironment, currentStage]);
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

  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

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
    } else {
    }
  }, [dispatch]);
  console.log(collOperDetails, "collOperDetails");

  return (
    <>
      {collOperDetails.map((col, index) => (
        <div key={col.collection_id}>
          <Accordion
            sx={accordionCollectionStyles}
            expanded={expandedIndexes.includes(col.collection_id)}
            onChange={() => {
              handleAccordionChange(index, col?.collection_id);
            }}
          >
            <AccordionSummary
              sx={{
                background:
                  currentTreeActive === col?.collection_id
                    ? "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)"
                    : theme.palette.sidebarMainBackground.main,
                color:
                  currentTreeActive === col?.collection_id
                    ? "#FFFFFF"
                    : "#FFFFFF80",
                minHeight: "34px",
                overflowY: "auto",
                overflowX: "hidden",
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
                  margin: "0px 0px",
                  position: "relative",
                }}
              >
                {getMinimalCollOperTreeLoading && (
                  <GlobalCircularLoader open={getMinimalCollOperTreeLoading} />
                )}
                <ExpandMoreIcon
                  sx={{
                    transform: expandedIndexes.includes(col.collection_id)
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                    transition: "transform 0.3s",
                    color: expandedIndexes.includes(col.collection_id)
                      ? "#FFFFFF"
                      : "#FFFFFF80",
                    fontSize: "18px",
                  }}
                />
                <TeritaryTextTypography
                  style={{
                    color: expandedIndexes.includes(col.collection_id)
                      ? "#FFFFFF"
                      : "#FFFFFF80",
                    fontSize: "12px",
                  }}
                >
                  {col.name}
                </TeritaryTextTypography>
              </Box>
            </AccordionSummary>
            <AccordionDetails
              id="envContainer"
              sx={{
                background: theme.palette.sidebarMainBackground.main,
                height: "150px",
                overflowY: "auto",
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
                    // background:
                    //   pathname?.split("/")[6] === op?.id
                    //     ? "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)"
                    //     : "",

                    background:
                      currentTreeActive === op?.id
                        ? "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)"
                        : theme.palette.sidebarMainBackground.main,
                    color:
                      currentTreeActive === op?.id ? "#FFFFFF" : "#FFFFFF80",
                  }}
                  onClick={() => {
                    dispatch(setCurrentTreeActive(op?.id));
                    router.push(
                      // `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/operations/${op?.id}`
                      `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/operations/${op?.id}`
                    );
                  }}
                >
                  {getMinimalCollOperTreeLoading && (
                    <GlobalCircularLoader
                      open={getMinimalCollOperTreeLoading}
                    />
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color:
                        currentTreeActive === op?.id ? "#FFFFFF" : "#FFFFFF80",
                    }}
                  >
                    <InfoNew />
                  </Box>

                  <TeritaryTextTypography
                    key={op.id}
                    style={{
                      color:
                        currentTreeActive === op?.id ? "#FFFFFF" : "#FFFFFF80",
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
              <div ref={containerRef}></div>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
      {/* {getCollOperTreeLoading && (
        <Box sx={{ position: "relative" }}>
          <GlobalCircularLoader open={true} noBackDrop />
        </Box>
      )} */}
    </>
  );
};

export default Endpoints;
