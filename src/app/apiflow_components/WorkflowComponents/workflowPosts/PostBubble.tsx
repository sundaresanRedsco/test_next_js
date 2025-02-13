import { TeritaryTextTypography } from "@/app/Styles/signInUp";
import { Avatar, Box, IconButton, Popover, Stack } from "@mui/material";
import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { AddReaction, ArrowDropDown, Send } from "@mui/icons-material";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import CommentBubble from "./CommentBubble";
import GInput from "../../global/GInput";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";
import CustomEmojiPicker from "./CustomEmojiPicker";
import CommentsContainer from "./CommentsContainer";
import useComments from "@/app/hooks/posts/useComments";

type Props = {
  type: "me" | "other";
  isLiked: boolean;
  handleLike: (code: any) => void;
  text: string;
  name: string;
  id: any;
  imageUrl?: any;
  commentsCount?: any;
  likes: any;
  likesCount?: any;
  channel_id?: any;
};

export default function PostBubble({
  type,
  isLiked,
  handleLike,
  text,
  name,
  id,
  imageUrl,
  likes,
  likesCount,
  commentsCount,
  channel_id,
}: Props) {
  const [isHover, setisHover] = useState(false);

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const {
    openComments,
    setopenCommentAnchorEl,
    openCommentAnchorEl,
    commentsLoading,
    comments,
    createComment,
    commentCreationLoading,
  } = useComments(id, userProfile?.user?.user_id);
  const popOverId = openComments ? "simple-popover" : undefined;

  const handlePopoverOpen = (event: any) => {
    setopenCommentAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = (event: any) => {
    setopenCommentAnchorEl(null);
  };

  return (
    <Stack
      spacing={1}
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: type == "me" ? "end" : "start",
        zIndex: "9998",
      }}
      direction={type == "me" ? "row-reverse" : "row"}
      onMouseEnter={() => setisHover(true)}
      onMouseLeave={() => setisHover(false)}
    >
      <Stack
        sx={{
          padding: 1,
          background: "#f2e7ff",
          borderRadius:
            type == "me" ? "10px 10px 0 10px" : "0px 10px 10px 10px",
          width: "70%",
          position: "relative",
        }}
        spacing={1}
      >
        {likesCount != 0 && (
          <Stack
            direction={"row"}
            sx={{
              position: "absolute",
              bottom: "-8px",
              right: type == "me" ? "auto" : "-2px",
              left: type == "me" ? "-2px" : "auto",
              paddingX: "10px",
              borderRadius: "20px",
              background: "#f2e7ff",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 1px 1px #c6c6c6",
              gap: "5px",
              paddingY: "2px",
            }}
          >
            {likes?.map((elem: any, index: number) => {
              return <Emoji key={index} unified={elem.emojis} size={13} />;
            })}
            <TeritaryTextTypography sx={{ fontSize: "11px", color: "black" }}>
              {likesCount}
            </TeritaryTextTypography>
          </Stack>
        )}
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
          <Avatar sx={{ width: 30, height: 30 }} />
          <TeritaryTextTypography>{name}</TeritaryTextTypography>
        </Stack>
        {imageUrl && <Box component={"img"} src={imageUrl} />}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TeritaryTextTypography>{text}</TeritaryTextTypography>
          <Stack direction={"row"}>
            <IconButton
              aria-owns={popOverId}
              aria-haspopup={true}
              onClick={handlePopoverOpen}
              size="small"
            >
              <FaRegComment size={"15px"} />
              {commentsCount ? commentsCount : ""}
            </IconButton>

            <Popover
              sx={{
                "& .MuiPaper-root": {
                  background: "transparent",
                  boxShadow: "none",
                  padding: "17px 10px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  width: "300px",
                },
              }}
              open={openComments}
              onClose={handlePopoverClose}
              anchorEl={openCommentAnchorEl}
              id={popOverId}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <CommentsContainer postId={id} type={type} />
            </Popover>
          </Stack>
        </Box>
      </Stack>

      <CustomEmojiPicker id={id} channel_id={channel_id} />
    </Stack>
  );
}
