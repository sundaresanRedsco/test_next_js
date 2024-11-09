import React, { useEffect, useRef, useState } from "react";
import { Box, useTheme } from "@mui/material";
import SearchV2Icon from "../../../Assests/icons/v2SearchIcon.svg";
import GInput from "../../Global/GInput";
import GDivider from "../../Global/GDivider";
import GButton from "../../Global/GButton";
import {
  clearFlowList,
  FlowReducer,
  GetApiDesignFlowByProjectIdStageId,
  GetDesignFlowOffset,
} from "../../../Redux/apiManagement/flowReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../../Redux/store";
import GlobalCircularLoader from "../../Global/GlobalCircularLoader";
import GAlertDetailBox from "../../Global/GAlertDetailBox";
import { environmentReducer } from "../../../Redux/apiManagement/environmentReducer";
import { setAddTabs, setTabs, tabsReducer } from "../../../Redux/tabReducer";
import { CommonReducer } from "../../../Redux/commonReducer";
import { workspaceReducer } from "../../../Redux/apiManagement/workspaceReducer";
import {
  MODULES,
  PERMISSIONS,
  SUB_MODULES,
} from "../../../Constants/permissionConstants";

const Flows = () => {
  const theme = useTheme(); // Access the current theme
  const dispatch = useDispatch<any>();
  const containerRef = useRef<any>(null);

  const { flowLoading, flowList, getDesignFlowOffsetLoading } = useSelector<
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

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

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
    if (currentEnvironmentDetails && currentStage) {
      let requestData = {
        project_id: currentEnvironment,
        stage_id: currentStage,
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
    }
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
  }, [
    currentPage,
    currentEnvironment,
    currentStage,
    currentEnvironmentDetails?.project_id,
  ]);

  useEffect(() => {
    if (currentEnvironmentDetails && currentStage) {
      let data = {
        project_id: currentEnvironmentDetails?.project_id,
        stage_id: currentStage,
      };
      dispatch(GetApiDesignFlowByProjectIdStageId(data))
        .unwrap()
        .then((flowRes: any) => {
          console.log(flowRes, "flowResflowRes");
          // setFlowVal(flowRes);
        })
        .catch((error: any) => {
          console.log("Error: ", error);
        });
    } else {
      dispatch(clearFlowList([]));
    }
  }, [currentEnvironmentDetails?.project_id, currentStage]);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <GInput
          className="FlowSearch"
          fullWidth
          variant="standard"
          value={flowSearchClicked ? searchVal : "Flows"}
          fontSize={flowSearchClicked ? "" : "10px"}
          fontWeight={flowSearchClicked ? "" : 600}
          color={
            flowSearchClicked ? "" : `${theme.palette.v2SecondaryColor.main}`
          }
          endIcon={
            <SearchV2Icon
              stroke={theme.palette.v2PrimaryColor.main}
              style={{ width: "8px", height: "8px", cursor: "pointer" }}
              onClick={() => setFlowSearchClicked((prev) => !prev)}
            />
          }
          disableUnderline={!flowSearchClicked}
          disabledColor={theme.palette.v2SecondaryColor.main}
          disabled={!flowSearchClicked}
          helperText={true}
          onChangeHandler={(e: any) => {
            handleFlowSearch(e.target.value);
          }}
        />
        <GButton
          buttonType="Outlined"
          buttonShape="circular"
          label="New"
          padding="0px"
          minWidth="35px"
          marginLeft="3px"
          disabled={currentEnvironment ? false : true}
          cursor={currentEnvironment ? "" : "pointer"}
          onClickHandler={() => {
            dispatch(setAddTabs("new_API_flow"));
          }}
        />
      </Box>
      <GDivider />
      <Box
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
          position: "relative",
          maxHeight: "300px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "1px", // Adjust the width of the scrollbar
          },
        }}
      >
        {/* {<GlobalCircularLoader open={flowLoading} />} */}
        {<GlobalCircularLoader open={getDesignFlowOffsetLoading} />}
        {flowList?.length === 0 ? (
          <GAlertDetailBox
            label={
              "DRAG AND DROP THE API FLOW EXPORTED FILE OR CLICK NEW BUTTON"
            }
          />
        ) : (
          <>
            {/* {flowList?.map((val: any) => ( */}
            {flowList?.map((val: any) => (
              <div id="scrollContainer" key={val?.id}>
                <GButton
                  buttonShape="circular"
                  // background={val?.bgColor}
                  // borderColor={val?.border}
                  // color={val?.color}
                  background={
                    tabs.some((tab) => tab.includes("designflow_" + val?.id))
                      ? theme?.palette.v2PrimaryColor.main
                      : "transparent"
                  }
                  borderColor={theme?.palette.v2PrimaryColor.main}
                  color={
                    tabs.some((tab) => tab.includes("designflow_" + val?.id))
                      ? "white" // or any other color for when the condition is true
                      : theme?.palette.v2PrimaryColor.main
                  }
                  label={val?.name}
                  padding="2px 4px"
                  minWidth="35px"
                  onClickHandler={() => {
                    // dispatch(setAddTabs("apiflow_" + val?.id));
                    onSelectCurrentFlow(val?.id);
                  }}
                  module_name={MODULES.API_MANAGEMENT}
                  sub_module={SUB_MODULES.IMPORTFROMAPIGATEWAY}
                  action={PERMISSIONS.CREATE_API_FLOW}
                />
              </div>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Flows;
