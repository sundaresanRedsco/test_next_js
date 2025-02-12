import { TeritaryTextTypography } from "@/app/Styles/signInUp";
import {
  Avatar,
  Box,
  IconButton,
  Popover,
  Skeleton,
  Stack,
} from "@mui/material";
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
import useLikes from "@/app/hooks/posts/useLikes";
import theme from "@/Theme/theme";
import { AdminServices } from "@/app/Services/services";
import { useQuery } from "@tanstack/react-query";
import { usePostStore } from "@/app/store/usePostStore";
import { queryClient } from "@/app/apiflow_Pages/layout/dashboardLayout";

type Props = {
  type: "me" | "other";
  isLiked: boolean;
  handleLike: (code: any) => void;
  text: string;
  name: string;
  id: any;
  imageUrl?: any;
  commentsCount?: any;
  likesCount?: any;
  channel_id?: any;
  likes?: any;
};

export default function PostBubble({
  type,
  isLiked,
  handleLike,
  text,
  name,
  id,
  imageUrl,
  likesCount,
  commentsCount,
  channel_id,
  likes,
}: Props) {
  const [isHover, setisHover] = useState(false);

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const { createLike, likeCreating } = useLikes({ postid: id });

  const { openCommentAnchorEl, setopenCommentAnchorEl, setPostId } =
    usePostStore();

  const openComments = Boolean(openCommentAnchorEl);
  const popOverId = openComments ? "simple-popover" : undefined;

  const handlePopoverOpen = (event: any) => {
    setopenCommentAnchorEl(event.currentTarget);
    setPostId(id);
    queryClient.invalidateQueries({ queryKey: ["comments"] });
  };
  const handlePopoverClose = (event: any) => {
    setopenCommentAnchorEl(null);
    setPostId("");
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
          background: theme.palette.sidebarMainBackground.main,
          borderRadius:
            type == "me" ? "10px 10px 0 10px" : "0px 10px 10px 10px",
          width: "70%",
          position: "relative",
        }}
        spacing={1}
      >
        {likeCreating ? (
          <Box
            sx={{
              position: "absolute",
              bottom: "-8px",
              right: type == "me" ? "auto" : "-2px",
              left: type == "me" ? "-2px" : "auto",
              borderRadius: "20px",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 1px 1px #373737",
              gap: "5px",
              background: theme.palette.modalBoxShadow.main,
            }}
          >
            <Skeleton
              sx={{
                width: "100px",
                height: "20px",
                borderRadius: "10px",
                background: theme.palette.modalBoxShadow.main,
              }}
              variant="rectangular"
            />
          </Box>
        ) : (
          likesCount != 0 && (
            <Stack
              direction={"row"}
              sx={{
                position: "absolute",
                bottom: "-8px",
                right: type == "me" ? "auto" : "-2px",
                left: type == "me" ? "-2px" : "auto",
                paddingX: "10px",
                borderRadius: "20px",
                background: theme.palette.modalBoxShadow.main,
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 1px 1px ${theme.palette.modalBoxShadow.main}`,
                gap: "5px",
                paddingY: "2px",
              }}
            >
              {likes?.map((elem: any, index: number) => {
                return <Emoji key={index} unified={elem.emojis} size={13} />;
              })}
              <TeritaryTextTypography
                sx={{
                  fontSize: "11px",
                  color: theme.palette.textTertiaryColor.main,
                }}
              >
                {likesCount}
              </TeritaryTextTypography>
            </Stack>
          )
        )}
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
          <Avatar
            sx={{
              width: 30,
              height: 30,
              // background: theme.palette.textTertiaryColor.main,
            }}
          />
          <TeritaryTextTypography
            sx={{
              color: theme.palette.textSecondaryColor.main,
            }}
          >
            {name}
          </TeritaryTextTypography>
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
          <TeritaryTextTypography
            sx={{
              color: theme.palette.textSecondaryColor.main,
            }}
          >
            {text}
          </TeritaryTextTypography>
          <Stack
            direction={"row"}
            sx={{ alignItems: "center", position: "relative" }}
          >
            <IconButton
              aria-owns={popOverId}
              aria-haspopup={true}
              onClick={handlePopoverOpen}
              sx={{ color: theme.palette.textTertiaryColor.main }}
            >
              <FaRegComment size={"15px"} />
            </IconButton>
            {commentsCount > 0 && (
              <TeritaryTextTypography
                sx={{
                  color: theme.palette.textSecondaryColor.main,
                  fontSize: "12px",
                  position: "absolute",
                  right: 0,
                }}
              >
                {commentsCount}
              </TeritaryTextTypography>
            )}
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
              <CommentsContainer type={type} />
            </Popover>
          </Stack>
        </Box>
      </Stack>

      <CustomEmojiPicker
        id={id}
        channel_id={channel_id}
        createLike={createLike}
      />
    </Stack>
  );
}
