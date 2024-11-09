"use client";

import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { SecondaryTextTypography } from "../../../Styles/signInUp";
import UserV2Icon from "../../../Assests/icons/v2UserIcon.svg";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import GBadge from "../../global/GButton";
import GButton from "../../global/GButton";
import { useDispatch, useSelector } from "react-redux";
import {
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
import { setTabs } from "../../../Redux/tabReducer";
import { resetEnvironmentState } from "../../../Redux/apiManagement/environmentReducer";
import { usePathname } from "next/navigation"; // Import usePathname
import { setCookies } from "@/app/Helpers/helpersFunctions";
import { resetProjectState } from "@/app/Redux/apiManagement/projectApiReducer";
import GlobalCircularLoader from "@/app/ApiFlowComponents/Global/GlobalCircularLoader";
import GSelect from "../../sign/discovery/GSelect";
import GSkeletonLoader from "@/app/ApiFlowComponents/Global/GSkeletonLoader";

const WorkspaceSelection = () => {
  const dispatch = useDispatch<any>();

  const containerRef = useRef<any>(null);
  const pathname = usePathname(); // Use usePathname instead of useLocation
  const queryParams = new URLSearchParams(pathname.split("?")[1]);
  const workspaceId = queryParams.get("workspaceId");
  const { userProfile, currentTreeActive } = useSelector<
    RootStateType,
    CommonReducer
  >((state) => state.common);

  const { workspaceList, currentWorkspace, getWsidLoading } = useSelector<
    RootStateType,
    workspaceReducer
  >((state) => state.apiManagement.workspace);

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
    dispatch(GetWorkspacesByUserId(data))
      .unwrap()
      .then((workspaceRes: any) => {
        console.log(workspaceRes, "WORKSPACECHECK2");
        if (workspaceRes?.length > 0) {
          setOffset((prevOffset) => prevOffset + limit);
          setTeamsCount(workspaceList?.length || 0);

          if (!currentWorkspace) {
            const currentSelectedWorkspace =
              workspaceList?.find((x) => x.id === workspaceId) ||
              workspaceList[0];

            console.log(
              currentSelectedWorkspace,
              workspaceList,
              "WORKSPACECHECK1"
            );

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

    setCookies(
      process.env.NEXT_PUBLIC_COOKIE_WSID || "",
      wsidVal,
      userProfile?.user?.expiration_time
    );

    const currentSelectedWorkspace = workspaceList?.find(
      (x: any) => x.id === wsidVal
    );
    Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_PROJECTID ?? "");

    dispatch(resetEnvironmentState());
    dispatch(setCurrentWorkspace(currentSelectedWorkspace));
    dispatch(resetProjectState());
    dispatch(setCurrentTreeActive(wsidVal));

    const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${wsidVal}?tabs=get_started`;
    dispatch(setTabs(["get_started"]));
    window.history.pushState({}, "", newUrl);
  };

  useEffect(() => {
    const container = document.getElementById("scrollable-container");
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (userProfile.user.user_id) {
      fetchPageData(offset);
    }
  }, [userProfile.user.user_id, offset]);

  console.log(
    currentWorkspace,
    workspaceList,
    "WORKSPACECHECK",
    currentTreeActive
  );
  const menuOption = workspaceList
    ?.filter((x) => x.id !== currentWorkspace?.id)
    .map((elem) => ({ label: elem.name, value: elem.id }));
  if (currentWorkspace)
    menuOption.unshift({
      label: currentWorkspace?.name,
      value: currentWorkspace?.id,
    });
  return (
    <Box sx={{ position: "relative" }}>
      {getWsidLoading && <GSkeletonLoader open={!getWsidLoading} />}
      <GSelect
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
      />
    </Box>
  );
};

export default WorkspaceSelection;
