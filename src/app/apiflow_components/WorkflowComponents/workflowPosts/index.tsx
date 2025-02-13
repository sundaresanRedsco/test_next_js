import React, { useEffect, useRef, useState } from "react";
import GInput from "../../global/GInput";
import {
  AddReaction,
  ArrowBack,
  AttachFile,
  Close,
  EmojiEmotions,
  Send,
} from "@mui/icons-material";
import { Box, IconButton, Popover, Skeleton, Stack } from "@mui/material";
import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
} from "@/app/Styles/signInUp";
import useWorkflowPost from "@/app/hooks/posts/useWorkflowPost";
import PostBubble from "./PostBubble";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";
import EmptyData from "./EmptyData";
import theme from "@/Theme/theme";
import { usePostStore } from "@/app/store/usePostStore";
import PostContainer from "./PostContainer";
import CommentsContainer from "./CommentsContainer";

type Props = {
  channel_id: string;
};

export default function WorkflowPosts({ channel_id }: Props) {
  //*HOOKS
  const { openComment, setopenComment, resetData } = usePostStore();
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  return (
    <Stack
      spacing={2}
      sx={{
        position: "relative",
        width: "400px",
        height: "100%",
      }}
      direction={"column"}
    >
      <Stack
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {openComment && (
          <IconButton
            onClick={() => {
              resetData("comment");
              resetData("mention");
              resetData("openComment");
            }}
            sx={{
              color: theme.palette.textTertiaryColor.main,
              position: "absolute",
              left: 0,
            }}
          >
            <ArrowBack />
          </IconButton>
        )}
        <PrimarySignInUPTypography>
          {openComment ? "Comments" : "Posts"}
        </PrimarySignInUPTypography>
      </Stack>

      {openComment ? (
        <CommentsContainer />
      ) : (
        <PostContainer channel_id={channel_id} />
      )}
    </Stack>
  );
}
