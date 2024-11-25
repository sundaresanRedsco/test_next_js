"use client";

import { Box, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  GetSelectionWorkspaces,
  GetWorkspacesByUserId,
  setCurrentWorkspace,
  workspaceReducer,
} from "../../../Redux/apiManagement/workspaceReducer";
import Cookies from "js-cookie";
import { RootStateType } from "../../../Redux/store";
import {
  CommonReducer,
  setCurrentTreeActive,
} from "../../../Redux/commonReducer";

import { resetEnvironmentState } from "../../../Redux/apiManagement/environmentReducer";
import { usePathname, useRouter } from "next/navigation"; // Import usePathname
import { setCookies } from "@/app/Helpers/helpersFunctions";
import { resetProjectState } from "@/app/Redux/apiManagement/projectApiReducer";

import GSelect from "../../sign/discovery/GSelect";
import GSkeletonLoader from "@/app/ApiFlowComponents/Global/GSkeletonLoader";
import { resetCollOperTreeData } from "@/app/Redux/apiManagement/endpointReducer";
import { clearFlowList } from "@/app/Redux/apiManagement/flowReducer";

const WorkspaceSelection = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const containerRef = useRef<any>(null);
  const pathname = usePathname(); // Use usePathname instead of useLocation
  const queryParams = new URLSearchParams(pathname.split("?")[1]);
  const workspaceId = queryParams.get("workspaceId");
  const { userProfile, currentTreeActive } = useSelector<
    RootStateType,
    CommonReducer
  >((state) => state.common);

  const {
    workspaceSelectList,
    currentWorkspace,
    getWsSelectLoading,
    totalCount,
  } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const theme = useTheme();
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const [loading, setLoading] = useState(false);
  const [teamsCount, setTeamsCount] = useState(0);

  const fetchPageData = async (offsetVal: number) => {
    const data = {
      user_id: userProfile?.user.user_id,
      offset: offsetVal,
      limit: limit,
    };

    setLoading(true);
    dispatch(GetSelectionWorkspaces(data))
      .unwrap()
      .then((workspaceRes: any) => {
        if (workspaceRes?.length > 0) {
          setOffset((prevOffset) => prevOffset + limit);
          setTeamsCount(workspaceSelectList?.length || 0);

          if (!currentWorkspace) {
            const currentSelectedWorkspace =
              workspaceSelectList?.find((x) => x.id === workspaceId) ||
              workspaceSelectList[0];
            dispatch(setCurrentWorkspace(currentSelectedWorkspace));
          }
        }
        setLoading(false);
      })
      .catch((error: any) => {
        console.log("ErrorWorkspace: ", error);
        setLoading(false);
      });
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        setOffset((prevPage) => prevPage + 5);
      }
    }
  };

  const handleSelectedTeam = (wsidVal: string) => {
    //encrypt wsid
    dispatch(resetCollOperTreeData([]));
    dispatch(clearFlowList([]));
    localStorage.clear();
    setCookies(
      process.env.NEXT_PUBLIC_COOKIE_WSID || "",
      wsidVal,
      userProfile?.user?.expiration_time
    );

    const currentSelectedWorkspace = workspaceSelectList?.find(
      (x: any) => x.id === wsidVal
    );
    Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_PROJECTID ?? "");

    dispatch(resetEnvironmentState());
    dispatch(setCurrentWorkspace(currentSelectedWorkspace));
    dispatch(resetProjectState());
    dispatch(setCurrentTreeActive(wsidVal));

    const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${wsidVal}`;
    router.push(newUrl);

    // window.history.pushState({}, "", newUrl);
  };

  useEffect(() => {
    const container = document.getElementById("scrollable-container");
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if ((userProfile.user.user_id, offset <= totalCount)) {
      fetchPageData(offset);
    }
  }, [userProfile.user.user_id, offset]);

  const menuOption = workspaceSelectList
    ?.filter((x) => x.id !== currentWorkspace?.id)
    .map((elem) => ({ label: elem.name, value: elem.id }));
  if (currentWorkspace)
    menuOption.unshift({
      label: currentWorkspace?.name,
      value: currentWorkspace?.id,
    });
  return (
    <Box sx={{ position: "relative" }}>
      {getWsSelectLoading && <GSkeletonLoader open={!getWsSelectLoading} />}
      <GSelect
        totalCount={totalCount}
        fetchData={fetchPageData}
        isMenuItemsLoading={loading}
        setisMenuItemsLoading={setLoading}
        options={menuOption}
        fullWidth={true}
        background="#FFFFFF1A"
        size={"small"}
        border="none"
        borderRadius="0px"
        value={currentWorkspace?.id || ""}
        radius="0px"
        padding="12px"
        customStyle={{
          "& .MuiOutlinedInput-root": {
            background:
              currentWorkspace && currentTreeActive === currentWorkspace?.id
                ? "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)"
                : "",
            borderRadius: "2px",
            border: "none",
            height: "100%",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover": {
              background: "linear-gradient(90deg, #9B53B0 0%, #7A43FE 100%)",
            },
          },
        }}
        onChange={(value: any) => {
          handleSelectedTeam(value);
        }}
        fontSize="13px"
        additionalMenuItemsStyle={{ maxHeight: "150px" }}
      />
    </Box>
  );
};

export default WorkspaceSelection;
