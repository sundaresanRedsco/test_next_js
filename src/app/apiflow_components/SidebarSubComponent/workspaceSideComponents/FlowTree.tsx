import { InfoNew } from "@/app/Assests/icons";
import { environmentReducer } from "@/app/Redux/apiManagement/environmentReducer";
import {
  FlowReducer,
  GetDesignflowMinamlInfoFlowoffset,
} from "@/app/Redux/apiManagement/flowReducer";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { CommonReducer, setCurrentTreeActive } from "@/app/Redux/commonReducer";
import { RootStateType } from "@/app/Redux/store";
import { setTabs, tabsReducer } from "@/app/Redux/tabReducer";
import { TeritaryTextTypography } from "@/app/Styles/signInUp";
import { AccordionDetails, Box, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import GSkeletonLoader from "@/app/apiflow_components/global/GSkeletonLoader";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";
import { useQuery } from "@tanstack/react-query";

export const FlowTree = ({ nestedExpandedIndexes }: any) => {
  const theme = useTheme(); // Access the current theme
  const dispatch = useDispatch<any>();
  const containerRef = useRef<any>(null);
  const router = useRouter();

  const { getDesignFlowOffsetLoading, flowList, totalCount } = useSelector<
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
  const [currentPage, setCurrentPage] = useState<any>({ start: 1, end: 5 });
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

    dispatch(setTabs(tempArr));

    window.history.pushState({}, "", newUrl);
  };

  const fetchPageData = async (page?: any) => {
    // if (currentEnvironmentDetails) {
    if (page) {
      setIsLoading(true);
    }
    let requestData = {
      project_id: currentEnvironment,
      start: page?.start ? page?.start : 1,
      end: page?.end ? page?.end : 6,
      name: "",
    };
    try {
      const response = await dispatch(
        GetDesignflowMinamlInfoFlowoffset(requestData)
      ).unwrap();
      if (response) {
        setIsLoading(false);
      }
      return response;
    } catch (error) {
      setIsLoading(false);
      return null;
    }
  };
  const pathname = usePathname();

  const isFetchAllowed =
    pathname.includes("/environment") ||
    pathname.includes("/workflow") ||
    pathname.split("/")[6]
      ? true
      : false;
  useQuery({
    queryKey: ["getFlowTree"],
    queryFn: fetchPageData,
    enabled: isFetchAllowed,
  });

  const [offsetVal, setoffsetVal] = useState({ start: 1, end: 6 });
  const handleScroll = () => {
    if (containerRef.current) {
      const bottom = containerRef.current.getBoundingClientRect().bottom;
      if (bottom <= window.innerHeight) {
        setoffsetVal((prev: any) => ({
          start: prev.start + 5,
          end: prev.end + 5,
        }));
      }
    }
  };

  useEffect(() => {
    if (currentEnvironment && isFetchAllowed) fetchPageData();
  }, [currentEnvironment, currentEnvironmentDetails?.project_id]);
  useEffect(() => {
    if (
      currentEnvironment &&
      totalCount >= offsetVal?.start &&
      isFetchAllowed
    ) {
      fetchPageData(offsetVal);
    }
  }, [offsetVal?.start, offsetVal?.end, currentEnvironment]);

  useEffect(() => {
    const container = document.getElementById("workflowContainer");
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { setIsPageLoading } = useGlobalStore();
  useEffect(() => {
    if (nestedExpandedIndexes.flow == "") {
      setoffsetVal({ start: 1, end: 6 });
    }
  }, [nestedExpandedIndexes.flow]);
  const isHeightIncrease =
    !getDesignFlowOffsetLoading &&
    !isLoading &&
    totalCount > offsetVal.start &&
    totalCount > 4;

  return (
    <AccordionDetails
      id="workflowContainer"
      sx={{
        width: "100%",
        "&.MuiAccordionDetails-root": {
          padding: "0px !important",
          display: "flex",
          flexDirection: "column",
        },
        maxHeight: "160px",
        overflowY: "auto",
      }}
    >
      {getDesignFlowOffsetLoading && !isLoading ? (
        <SkeletonLoader />
      ) : (
        flowList?.map((flow: any, index: number) => (
          <div
            key={index}
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
              if (
                pathname !=
                `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/workflow/${flow?.id}`
              ) {
                setIsPageLoading(true);
              }
              router.push(
                `/userId/${userProfile?.user.user_id}/workspaceId/${currentWorkspace?.id}/workflow/${flow?.id}`
              );
              dispatch(setCurrentTreeActive(flow?.id));
            }}
          >
            <TeritaryTextTypography
              style={{
                color: currentTreeActive === flow.id ? "#FFFFFF" : "#FFFFFF80",
                fontSize: "10px",

                cursor: "pointer",
                maxWidth: "160px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {`${flow.name}`}
            </TeritaryTextTypography>
          </div>
        ))
      )}

      {isLoading && <SkeletonLoader />}
      <div
        ref={containerRef}
        style={{
          height: isHeightIncrease ? "50px" : 0,
        }}
      ></div>
    </AccordionDetails>
  );
};
export const SkeletonLoader = () => {
  return [1, 2, 3, 4].map((elem, index) => {
    return (
      <div
        key={index}
        style={{
          padding: "10px 0 10px 50px",
          position: "relative",
          width: "auto",
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
  });
};
