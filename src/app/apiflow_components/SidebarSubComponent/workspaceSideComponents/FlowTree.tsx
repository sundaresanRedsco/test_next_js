import { InfoNew } from "@/app/Assests/icons";
import { environmentReducer } from "@/app/Redux/apiManagement/environmentReducer";
import {
  clearFlowList,
  FlowReducer,
  GetApiDesignFlowByProjectIdStageId,
  GetDesignFlowOffset,
} from "@/app/Redux/apiManagement/flowReducer";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { CommonReducer, setCurrentTreeActive } from "@/app/Redux/commonReducer";
import { RootStateType } from "@/app/Redux/store";
import { setTabs, tabsReducer } from "@/app/Redux/tabReducer";
import {
  SecondaryTextTypography,
  TeritaryTextTypography,
} from "@/app/Styles/signInUp";
import { Box, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import GlobalCircularLoader from "@/app/ApiFlowComponents/Global/GlobalCircularLoader";

export const FlowTree = () => {
  const theme = useTheme(); // Access the current theme
  const dispatch = useDispatch<any>();
  const containerRef = useRef<any>(null);
  const router = useRouter();

  const { getDesignFlowOffsetLoading, flowList } = useSelector<
    RootStateType,
    FlowReducer
  >((state) => state.apiManagement.apiFlowDesign);

  const { currentEnvironment, currentEnvironmentDetails, currentStage } =
    useSelector<RootStateType, environmentReducer>(
      (state) => state.apiManagement.environment
    );

  const { tabs } = useSelector<RootStateType, tabsReducer>(
    (state) => state.tabs
  );

  const { userProfile, currentTreeActive } = useSelector<
    RootStateType,
    CommonReducer
  >((state) => state.common);

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const [flowSearchClicked, setFlowSearchClicked] = useState(false);
  const [flowVal, setFlowVal] = useState<any[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const [inputVal, setInputVal] = useState("Flows");
  const [startVal, endStartVal] = useState<number>(0);
  const [endVal, setEndVal] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFlowSearch = (value: any) => {
    setSearchVal(value);
  };

  const onSelectCurrentFlow = (flowId: any) => {
    if (tabs?.includes("designflow_" + flowId)) {
      return;
    }

    const filteredTabs = tabs.filter((tab) => {
      return !tab.startsWith("designflow_");
    });

    const flowTab = "designflow_" + flowId;

    let tempArr = [flowTab, ...filteredTabs];

    const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${
      currentWorkspace?.id
    }?tabs=${tempArr.join(",")}`;

    // const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/design-api/${flowId}?tabs=${flowTab}`;
    console.log(tempArr, newUrl, "tempArrtempArr");
    dispatch(setTabs(tempArr));

    window.history.pushState({}, "", newUrl);
  };

  const fetchPageData = async (page: number) => {
    // if (currentEnvironmentDetails) {
    let requestData = {
      project_id: currentEnvironment,
      start: 0,
      end: page,
      name: "",
    };

    dispatch(GetDesignFlowOffset(requestData))
      .unwrap()
      .then((flowRes: any) => {
        console.log(flowRes, "flowResflowRes");
        setFlowVal(flowRes);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      })
      .finally(() => setIsLoading(false));
    // }
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        // setCurrentPage((prevPage) => prevPage + 8);
        setCurrentPage((prevPage) => prevPage + 5);
      }
    }
  };

  useEffect(() => {
    // if (currentPage > 1) {
    //   // Fetch additional data when scrolling
    //   fetchPageData(currentPage);
    // }
    fetchPageData(currentPage);
  }, [currentPage, currentEnvironment, currentEnvironmentDetails?.project_id]);

  // useEffect(() => {
  //   // if (currentEnvironmentDetails) {
  //     let data = {
  //       project_id: currentEnvironmentDetails?.project_id,
  //       // stage_id: currentStage,
  //     };
  //     dispatch(GetApiDesignFlowByProjectIdStageId(data))
  //       .unwrap()
  //       .then((flowRes: any) => {
  //         console.log(flowRes, "flowResflowRes");
  //         // setFlowVal(flowRes);
  //       })
  //       .catch((error: any) => {
  //         console.log("Error: ", error);
  //       });
  //   // } else {
  //   //   dispatch(clearFlowList([]));
  //   // }
  // }, [currentEnvironmentDetails?.project_id, currentStage]);

  return (
    <>
      {flowList.map((flow: any, index: number) => (
        <div
          style={{
            position: "relative",
            background:
              currentTreeActive === flow.id
                ? "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)"
                : theme.palette.sidebarMainBackground.main,
            color: currentTreeActive === flow.id ? "#FFFFFF" : "#FFFFFF80",
            padding: "10px 0 10px 50px",
          }}
          onClick={() => {
            router.push(
              `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/workflow/${flow?.id}`
            );
            dispatch(setCurrentTreeActive(flow?.id));
            // .unwrap()
            // .then((res: any) => {
            //
            // });
          }}
        >
          {getDesignFlowOffsetLoading && (
            <GlobalCircularLoader open={getDesignFlowOffsetLoading} />
          )}
          <TeritaryTextTypography
            style={{
              color: currentTreeActive === flow.id ? "#FFFFFF" : "#FFFFFF80",
              fontSize: "10px",
              //   marginTop: "2rem",
              cursor: "pointer",
            }}
          >
            {`${flow.name}`}
          </TeritaryTextTypography>
        </div>
      ))}

      {/* {getDesignFlowOffsetLoading && (
        <Box sx={{ position: "relative" }}>
          <GlobalCircularLoader open={true} noBackDrop />
        </Box>
      )} */}
    </>
  );
};
