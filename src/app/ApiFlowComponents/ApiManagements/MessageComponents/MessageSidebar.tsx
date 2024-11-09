import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { PrimaryTextTypography } from "../../../Styles/signInUp";
import GButton from "../../Global/GButton";
import GDivider from "../../Global/GDivider";
import GBadge from "../../Global/GBadge";
import UserV2Icon from "../../../Assests/icons/v2UserIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  GetChanelByWorkspaceId,
  postReducer,
} from "../../../Redux/PostReducer/postReducer";
import { RootStateType } from "../../../Redux/store";
import { setAddTabs } from "../../../Redux/tabReducer";
import {  getCookies } from "@/app/Helpers/helpersFunctions";

const channelsVal = [
  {
    name: "Teams Workspace",
    countValue: 0,
    isPrimary: true,
  },
  {
    name: "AWS-Dev",
    countValue: 12,
    isPrimary: false,
  },
];

const teamVal = [
  {
    name: "user 1",
    countValue: 0,
  },
  {
    name: "user 2",
    countValue: 12,
  },
];

const MessageSidebar = () => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();

  const wrkidVal = getCookies(process.env.NEXT_PUBLIC_COOKIE_WSID ?? "");

  const { getWorspaceOffset } = useSelector<RootStateType, postReducer>(
    (state) => state.apiPosts.posts
  );

  console.log(getWorspaceOffset, "getWorspaceOffsetsdsd");

  const [channelsValue, setchannelsValue] = useState<any[]>(channelsVal);
  const [teamValue, setTeamValue] = useState<any[]>(teamVal);

  useEffect(() => {
    let data = {
      workspace_id: wrkidVal,
      start: 1,
      end: 1000,
    };
    dispatch(GetChanelByWorkspaceId(data))
      .unwrap()
      .then((res: any) => {});
  }, [wrkidVal]);

  return (
    <Box
      sx={{
        marginTop: "20px",
      }}
    >
      {/* Your Channels */}
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PrimaryTextTypography style={{ fontSize: "11px" }}>
            Your Channels
          </PrimaryTextTypography>
          <GButton
            buttonShape="circular"
            buttonType="primary"
            label={"New"}
            background={theme.palette.v2MsgBtnBg.main}
            borderColor={theme.palette.v2MsgBtnBg.main}
            padding="0px"
            minWidth="35px"
            onClickHandler={() => {
              dispatch(setAddTabs("post_page"));
            }}
          />
        </Box>
        <GDivider />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {getWorspaceOffset?.map((val: any, index: number) => (
            <GButton
              buttonShape="circular"
              buttonType={"primary"}
              label={
                // <GBadge
                //   badgeContent={val?.channel_name}
                //   color="#E50001"
                //   iconLeft="30px"
                // >
                val?.channel_name
                // {/* </GBadge> */}
              }
              background={theme.palette.v2MsgBtnBg.main}
              borderColor={theme.palette.v2MsgBtnBg.main}
              padding="6px 20px 6px 13px"
              minWidth="35px"
              marginLeft={index === 0 ? "0px" : "5px"}
            />
          ))}
        </Box>
      </>

      {/* your team */}
      <Box sx={{ marginTop: "20px" }}>
        <PrimaryTextTypography style={{ fontSize: "11px" }}>
          Your Team
        </PrimaryTextTypography>
        <GDivider />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {teamValue?.map((val: any, index: number) => (
            <GButton
              buttonShape="circular"
              startIcon={<UserV2Icon width={"14px"} height={"14px"} />}
              label={
                <GBadge
                  badgeContent={val?.countValue}
                  color="#E50001"
                  iconLeft="20px"
                >
                  {val?.name}
                </GBadge>
              }
              padding="6px 20px 6px 10px"
              minWidth="35px"
              marginLeft={index === 0 ? "0px" : "5px"}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageSidebar;
